import WinstonInterface from "./interface";
import ErrorsLevelsEnum, {
   ERRORS_LEVELS_ENUM,
} from "../../../enums/errors_levels.enum";
import { Logger } from "winston";
import { createLogger } from "winston";

class WinstonLogger implements WinstonInterface {
   private static instance: WinstonLogger;
   private readonly loggerInstance: Logger;
   private readonly levelMap: Record<
      ERRORS_LEVELS_ENUM,
      (obj: object, message?: string, ...args: any) => void
   >;
   constructor() {
      this.loggerInstance = createLogger();
      this.levelMap = {
         [ErrorsLevelsEnum.Values.ERROR]: (
            obj: object,
            message?: string,
            ...args: any
         ) => this.loggerInstance.error(JSON.stringify(obj), message, ...args),
         [ErrorsLevelsEnum.Values.WARN]: (
            obj: object,
            message?: string,
            ...args: any
         ) => this.loggerInstance.warn(JSON.stringify(obj), message, ...args),
         [ErrorsLevelsEnum.Values.INFO]: (
            obj: object,
            message?: string,
            ...args: any
         ) => this.loggerInstance.info(JSON.stringify(obj), message, ...args),
         [ErrorsLevelsEnum.Values.DEBUG]: (
            obj: object,
            message?: string,
            ...args: any
         ) => this.loggerInstance.debug(JSON.stringify(obj), message, ...args),
         [ErrorsLevelsEnum.Values.CRITICAL]: (
            obj: object,
            message?: string,
            ...args: any
         ) => this.loggerInstance.debug(JSON.stringify(obj), message, ...args),
      };
   }

   public static getLoggerInstance(): WinstonLogger {
      if (!WinstonLogger.instance) {
         WinstonLogger.instance = new WinstonLogger();
      }
      return WinstonLogger.instance;
   }
   handle(
      obj: object,
      level: ERRORS_LEVELS_ENUM,
      message: string,
      ...args: any[]
   ) {
      (this.levelMap[level] || this.levelMap.ERROR)(obj, message, ...args);
   }
}

export default WinstonLogger;
