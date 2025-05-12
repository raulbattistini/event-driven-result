import { DataSourceOptions } from "typeorm";

function getEnv(key: string, defaultValue: string): string {
   const value = process.env[key];
   if (value === undefined) {
      return defaultValue;
   }
   return value;
}

function getDatabaseConfig(): DataSourceOptions {
   return {
      type: getEnv("DB_TYPE", "postgres") as any,
      host: getEnv("DB_HOST", "localhost"),
      port: parseInt(getEnv("DB_PORT", "5432")),
      username: getEnv("DB_USERNAME", "postgres"),
      password: getEnv("DB_PASSWORD", "postgres"),
      database: getEnv("DB_DATABASE", "art_works"),
      synchronize: getEnv("DB_SYNCHRONIZE", "true") === "true",
      logging: getEnv("DB_LOGGING", "false") === "true",
   };
}

function getMongoConfig(): MongoClientOptions {
   return {
      type: getEnv("DB_TYPE", "mongodb") as "mongodb",
      host: getEnv("MONGO_DB_HOST", "localhost"),
      port: parseInt(getEnv("MONGO_DB_PORT", "5432")),
      username: getEnv("MONGO_DB_USERNAME", "postgres"),
      password: getEnv("MONGO_DB_PASSWORD", "postgres"),
      database: getEnv("MONGO_DB_DATABASE", "art_works"),
      synchronize: getEnv("MONGO_DB_SYNCHRONIZE", "true") === "true",
      logging: getEnv("MONGO_DB_LOGGING", "false") === "true",
   };
}

function getApiConfig(): ApiConfig {
   return {
      host: getEnv("API_HOST", "localhost"),
      port: parseInt(getEnv("API_PORT", "6969")),
   };
}

export { getDatabaseConfig, getMongoConfig, getApiConfig };
