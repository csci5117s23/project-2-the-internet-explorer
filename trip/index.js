
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
  startDate: date().required(),       // The start date of the trip.
  endDate: date().required(),         // The end date of the trip.
  description: string(),              // An optional description of the trip.
  folderColor: string(),              // The color for the trip folder.
  user: string().required(),          // The user that created the trip.
});

// Create the memories collection.
const tripMemoriesYup = object({
  parentTripId: string().required(),  // The id of the parent trip
  title: string().required(),         // The title of the memory
  description: string(),              // An optional description of the memory.
  date: date().required,              // The date of the memory.
  address: string().required,         // The address/location of the memory.
  category: string().required,        // The category of the memory.
  image: string().required,           // An image of the memory.
  user: string().required,            // The user that created the memory.
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
  conn.getMany('tripFolder', options).json(res);
}
app.get('/tripFolder', getAllTrips);

// Retrieve the memories of a specified category of a specified trip.
async function getMemories(req, res) {
  const userId = req.user_token.sub;
  const tripId = req.query.trip;
  const category = req.query.category;

  const conn = await Datastore.open();
  const query = {$and: [{"user": userId}, {"parentTripId": tripId}, {"category": category}]};
  
  const options = {
    filter: query,
    sort: {"date": 1}
  }
  conn.getMany('tripMemories', options).json(res);
}
app.get('/tripMemories', getMemories);

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
    next(error);
  }
}
app.use(userAuth);

// Some extra logic for making a POST and GET request from the tripFolder 
// collection. Retrieve the userId and store it in the body or query, 
// respectively.
app.use('/tripFolder', (req, res, next) => {
  if (req.method === "POST") {
    req.body.user = req.user_token.sub;
  } else if (req.method === "GET") {
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
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {tripFolder: tripFolderYup, tripMemories: tripMemoriesYup});

// bind to serverless runtime
export default app.init();
