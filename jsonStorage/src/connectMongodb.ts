import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const uri: string | undefined = process.env.DB_URI ?? '';
console.log(uri);

const client: MongoClient = new MongoClient(uri);
const getCollectionUserData = async () => {
  try {
    await client.connect();

    const db = client.db('db');
    const userData = db.collection('userData');
    console.log('Connected successfully to server');

    return userData;
  } catch (err) {
    console.error('Error connected to server');
    throw err;
  }
};

export { getCollectionUserData };
