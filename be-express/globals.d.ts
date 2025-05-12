export declare global {
   type MongoClientOptions = {
      type: "mongodb";
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
      synchronize: boolean;
      logging: boolean;
   };
   type ApiConfig = {
      host: string;
      port: number;
   };
   type DatabaseConfig = MongoClientOptions;
   type MongoDbConfig = MongoClientOptions;
   type AppConfig = {
      api: ApiConfig;
      database: DatabaseConfig;
      mongoDb: MongoDbConfig;
   };
   type IDUnion = string | number;
   type UUID = string & { __brand: "UUID" };
   type MongoUri = string & { __brand: "MongoUri" };
   type ZodString = string & { __brand: "ZodString" };
   type ZodNumber = number & { __brand: "ZodNumber" };
   type ZodStringOrNumber = ZodString | ZodNumber;
}
