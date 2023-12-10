import { MongoClient } from 'mongodb';


const uri: string = "mongodb+srv://Webapp:Universityfinds123@universityfinds.1x4cgdt.mongodb.net/?retryWrites=true&w=majority";
const client: MongoClient = new MongoClient(uri);
  

export default client;
