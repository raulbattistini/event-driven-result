import { DataSourceOptions } from "typeorm";
import { ApiConfig } from "./env";

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

function getApiConfig(): ApiConfig {
  return {
    host: getEnv("API_HOST", "localhost"),
    port: parseInt(getEnv("API_PORT", "6969")),
  };
}

export { getDatabaseConfig, getApiConfig };
