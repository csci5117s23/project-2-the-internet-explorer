
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import jwtDecode from "jwt-decode";
import { object, string, date } from "yup";

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

//create the trip folder
const tripFolderYup = object({
  tripName: string().required(),      // The name of the trip.
  startMonth: string().required(),    // The start month of the trip.
  startYear: string().required(),     // The start year of the trip.
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

// Retrieve all of the trips of a user for the main page.
async function getAllTrips(req, res) {
  const userId = req.user_token.sub;

  const conn = await Datastore.open();
  const query = {"user": userId};

  const options = {
    filter: query,
    sort: {"startDate": 1}
  };
  conn.getMany('tripFolders', options).json(res);
}
app.get('/getAllTrips', getAllTrips);

async function getTripMemories(req, res) {
  const userId = req.user_token.sub;
  const tripId = req.query.trip;

  const conn = await Datastore.open();
  const query = {$and: [{"user": userId}, {"parentTripId": tripId}]};

  const options = {
    filter: query,
    sort: {"date": 1},
    // hints: {$fields: {date: 1, image: 1, _id: 1}}
  }
  conn.getMany('tripMemories', options).json(res);
}
app.get('/getTripMemories', getTripMemories);

// Retrieve the memories of a specified category of a specified trip.
async function getCategoryMemories(req, res) {
  const userId = req.user_token.sub;
  const tripId = req.query.trip;
  const category = req.query.category;

  const conn = await Datastore.open();
  const query = {$and: [{"user": userId}, {"parentTripId": tripId}, {"category": category.toLowerCase()}]};
  
  const options = {
    filter: query,
    sort: {"date": 1}
  }
  conn.getMany('tripMemories', options).json(res);
}
app.get('/getCategoryMemories', getCategoryMemories);

// async function getDateMemories(req, res) {
//   const userId = req.user_token.sub;
//   const tripId = req.query.trip;
//   const date = 
// }

async function addMemory(req, res) {
  const conn = await Datastore.open();
  const doc = await conn.insertOne('tripMemories', req.body);

  res.status(201).json(doc);
}
app.post('/addMemory', addMemory);

// async function deleteAllMemories(req, res) {
//   const conn = await Datastore.open();
//   const query = {"_id": {$exists: true}};

//   const options = {
//     filter: query
//   };

//   const data = await conn.removeMany('tripMemories', options);
//   res.json(data);
// }
// app.delete('/deleteMemories', deleteAllMemories);

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

// Some extra logic for making a POST and GET request from the tripFolders 
// collection. Retrieve the userId and store it in the body or query, 
// respectively.
app.use('/tripFolders', (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
})

app.use('/getAllTrips', (req, res, next) => {
  if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
});

app.use('/addMemory', (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.user_token.sub;
  }
  next();
});

app.use('/getTripMemories', (req, res, next) => {
  if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
})

// Some extra logic for making a POST and GET request from the tripMemories
// collection. Retrieve the userId and store it in the body or query,
// respectively.
app.use('/tripMemories', (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
  }
  next();
});

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
    console.error('Error: ', e);
    res.status(404).end(e);
    return;
  }

  next();
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {tripFolders: tripFolderYup, tripMemories: tripMemoriesYup});

// bind to serverless runtime
export default app.init();
