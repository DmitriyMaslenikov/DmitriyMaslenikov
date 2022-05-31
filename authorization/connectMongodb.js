const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI;

const client = new MongoClient(uri);
async function getCollectionUsers() {
  try {
    await client.connect();
    const db = await client.db('db_auth');
    const users = await db.collection('users');
    console.log('Connected successfully to server');

    return users;
  } catch {
    console.log('Error connected to server');
  }
}

module.exports = { getCollectionUsers };
