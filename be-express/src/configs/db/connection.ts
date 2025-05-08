import { DataSource } from "typeorm";
import { getConfig } from "../env";

export default async function getConnection(): Promise<DataSource> {
  return await new DataSource(getConfig().database).initialize();
}
