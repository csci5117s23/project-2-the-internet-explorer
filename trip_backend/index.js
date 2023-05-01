
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import jwtDecode from "jwt-decode";
import { object, string, date, number } from "yup";

//create the trip folder
const tripFolderYup = object({
  tripName: string().required(),      // The name of the trip.
  startMonth: number().required(),    // The start month of the trip.
  startYear: number().required(),     // The start year of the trip.
  description: string(),              // An optional description of the trip.
  user: string().required(),          // The user that created the trip.
});

// Create the memories collection.
const tripMemoriesYup = object({
  parentTripId: string().required(),  // The id of the parent trip
  title: string().required(),         // The title of the memory
  description: string(),              // An optional description of the memory.
  date: date().required(),            // The date of the memory.
  location: string().required(),      // The location name of the memory.
  latitude: string().required(),      // The latitude of the location.
  longitude: string().required(),     // The longitude of the location.
  category: string().required(),      // The category of the memory.
  image: string().required(),         // An image of the memory.
  user: string().required(),          // The user that created the memory.
});

// A custom endpoint to delete all memories with a specified parent trip.
async function deleteTripMemories(req, res) {
  const conn = await Datastore.open();
  const query = {$and: [{"user": req.query.user}, {"parentTripId": req.query.trip}]};

  const options = {
    filter: query
  }

  const data = await conn.removeMany('tripMemories', options);
  res.json(data);
}
app.delete('/deleteMemories', deleteTripMemories);

// async function deleteAllMemories(req, res) {
//   const conn = await Datastore.open();
//   const query = {"_id": {$exists: false}};

//   const options = {
//     filter: query
//   };

//   const data = await conn.removeMany('tripMemories', options);
//   res.json(data);
// }
// app.delete('/deleteMemory', deleteAllMemories);

// async function deleteAllTrips(req, res) {
//   const conn = await Datastore.open();
//   const query = {"_id": {$exists: true}};

//   const options = {
//     filter: query
//   };

//   const data = await conn.removeMany('tripFolders', options);
//   res.json(data);
// }
// app.delete('/deleteTrips', deleteAllTrips);

// Retrieves the user token from the request headers and stores it in 
// the request. This happens prior to any database access.
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error).end();
    // next(error);
  }
}
app.use(userAuth);

// Some extra logic for making a POST, GET, DELETE, or PATCH request from the tripFolders 
// collection. Retrieve the userId and store it in the body or query.
app.use('/tripFolders', (req, res, next) => {
  if (req.method === "POST") {
    req.body._id = '';
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  } else if (req.method === "DELETE") {
    req.query.user = req.user_token.sub;
  } else if (req.method === "PATCH") {
    req.body.user = req.user_token.sub;
  }
  next();
})

// Some extra logic for making a POST, GET, DELETE, or PATCH request from the tripMemories
// collection. Retrieve the userId and store it in the body or query,
app.use('/tripMemories', (req, res, next) => {
  if (req.method === "POST") {
    req.body._id = '';
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  } else if (req.method === "DELETE") {
    req.query.user = req.user_token.sub;
  } else if (req.method === "PATCH") {
    req.body.user = req.user_token.sub;
  }
  next();
});

// Some extra logic for the /deleteMemories endpoint for a DELETE request. Retrieve
// the userId and store it in the query.
app.use('/deleteMemories', async(req, res, next) => {
  if (req.method === "DELETE") {
    req.query.user = req.user_token.sub;
  }
  next();
})

// Some extra logic when requesting a specific trip. Retrieve the requested trip, then
// check if the requester has access to it.
app.use('/tripFolders/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub;

  const conn = await Datastore.open();
  try {
    const trip = await conn.getOne('tripFolders', id);
    if (trip.user != userId) {
      res.status(403).end();
      return;
    }
  } catch (e) {
    res.status(404).end(e);
    return;
  }

  next();
});

// Some extra logic when requesting a specific memory. Retrieve the requested memory, then
// check if the requester has access to it.
app.use('/tripMemories/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub;

  const conn = await Datastore.open();
  try {
    const memory = await conn.getOne('tripMemories', id);
    if (memory.user != userId) {
      res.status(403).end();
      return;
    }
  } catch (e) {
    res.status(404).end(e);
    return;
  }

  next();
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {tripFolders: tripFolderYup, tripMemories: tripMemoriesYup});

// bind to serverless runtime
export default app.init();
