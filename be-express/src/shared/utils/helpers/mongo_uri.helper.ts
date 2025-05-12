export default function mongoUriFormatter(
   mongoOpts: MongoClientOptions,
): MongoUri {
   return `${mongoOpts.type}://${mongoOpts.username}:${mongoOpts.password}@${mongoOpts.host}:${mongoOpts.port}/${mongoOpts.database}` as MongoUri;
}
