import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(
   cors({
      origin: (_origin, cb) => cb(null, true),
      credentials: true,
      allowedHeaders: "*",
   }),
);
app.use(helmet());
app.use(express.json());

export default app;
