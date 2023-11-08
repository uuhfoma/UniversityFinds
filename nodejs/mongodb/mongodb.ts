import { MongoClient } from 'mongodb';

async function main() {
  const uri: string = "mongodb+srv://Webapp:<Universityfinds123>@universityfinds.1x4cgdt.mongodb.net/?retryWrites=true&w=majority";
  const client: MongoClient = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to the database.");
    
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();