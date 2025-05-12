import "dotenv";
import { getDatabaseConfig, getApiConfig, getMongoConfig } from "./app_config";

export function getConfig(): AppConfig {
   const config: AppConfig = {
      api: getApiConfig(),
      database: getDatabaseConfig(),
      mongoDb: getMongoConfig(),
   };
   return config;
}
