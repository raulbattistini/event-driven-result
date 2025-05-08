import app from "./app";
import { getConfig } from "./configs/env";
import WinstonLogger from "./shared/utils/helpers/logger/default.logger";
import ErrorsLevelsEnum from "./shared/enums/errors_levels.enum";
import getConnection from "./configs/db/connection";

const appConfig = getConfig();
const { port, host } = appConfig.api;
const logger = WinstonLogger.getLoggerInstance();

app.listen(port, host, async () => {
   (await getConnection()).initialize().catch((error) => {
      logger.handle(
         { message: error },
         ErrorsLevelsEnum.Values.ERROR,
         "Database connection error",
      );
   });
   logger.handle(
      { message: `Server is running on ${host}://${port}` },
      ErrorsLevelsEnum.Values.INFO,
      "Server started successfully",
   );
});
