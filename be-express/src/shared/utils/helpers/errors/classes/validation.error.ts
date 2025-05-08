import AbstractGlobalError from "../global.error";
import {
   allStatusCodesArray,
   allStatusCodes,
   ClientErrorStatusCodeName,
   clientErrorStatusCodesArray,
} from "../global_definitions.error";

class ValidationError extends AbstractGlobalError {
   public readonly name: string = "ValidationError";
   public readonly statusCode: (typeof clientErrorStatusCodesArray)[number];
   public readonly status: typeof ClientErrorStatusCodeName;
   constructor(
      status: (typeof allStatusCodesArray)[number],
      name: string,
      message?: string,
   ) {
      super(allStatusCodes[status], status, name, message);
      this.status = allStatusCodes[status];
   }
}

export default ValidationError;
