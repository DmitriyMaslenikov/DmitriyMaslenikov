import { getCollectionUserData } from '../connectMongodb';

const mongoClientPromise = getCollectionUserData();

const replaceData = async (key: string, userData: JSON) => {
  const data = await mongoClientPromise;

  await data.replaceOne({ key }, { key, data: userData }, { upsert: true });
  return;
};
const getData = async (key: string) => {
  const data = await mongoClientPromise;
  return data.findOne({ key });
};

export { getData, replaceData };
