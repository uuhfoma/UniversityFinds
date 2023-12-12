import { MongoClient } from 'mongodb';


const uri: string = "mongodb://127.0.0.1:27017";
const client: MongoClient = new MongoClient(uri);
  

export default client;
