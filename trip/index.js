
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js';
import {crudlify} from 'codehooks-crudlify';
import jwtDecode from "jwt-decode";
import { object, string } from "yup";

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

//create the trip folder
const tripFolderYup = object({
  tripName: string().required(),
  startDate: string().required(),
  endDate: string().required(),
  description: string(),
  user: string().required(),
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {tripFolder: tripFolderYup})

// bind to serverless runtime
export default app.init();
