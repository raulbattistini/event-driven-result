import "dotenv";
import { DataSourceOptions } from "typeorm";
import { getDatabaseConfig, getApiConfig } from "./app_config";

export type ApiConfig = {
  host: string;
  port: number;
};

export type DatabaseConfig = DataSourceOptions;

export type AppConfig = {
  api: ApiConfig;
  database: DatabaseConfig;
};

export function getConfig(): AppConfig {
  const config: AppConfig = {
    api: getApiConfig(),
    database: getDatabaseConfig(),
  };
  return config;
}
