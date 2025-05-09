import { MongoClient } from "mongodb";
import { getConfig } from "../env";
import mongoUriFormatter from "../../shared/utils/helpers/mongo_uri.helper";

export default async function getMongoConnection(): Promise<any> {
   const uri = mongoUriFormatter(getConfig().mongoDb);
   const client = new MongoClient(uri, {
      auth: {
         username: getConfig().mongoDb.username,
         password: getConfig().mongoDb.password,
      },
      connectTimeoutMS: 10000,
      directConnection: true,
   });

   return await client.connect();
}
