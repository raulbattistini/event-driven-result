import AbstractGlobalError from "../global.error";
import {
   allStatusCodes,
   allStatusCodesArray,
   ServerErrorStatusCodeName,
   serverErrorStatusCodesArray,
} from "../global_definitions.error";

class RepositoryError extends AbstractGlobalError {
   public readonly name: string = "Repository Error";
   public readonly statusCode: (typeof serverErrorStatusCodesArray)[number];
   public readonly status: typeof ServerErrorStatusCodeName;
   constructor(
      status: (typeof allStatusCodesArray)[number],
      name: string,
      message?: string,
   ) {
      super(allStatusCodes[status], status, name, message);
      this.status = allStatusCodes[status];
   }
}

export default RepositoryError;
