import {
   allStatusCodesArray,
   HttpStatusCode,
   HttpStatusCodeName,
} from "./index";

class AbstractGlobalError extends Error {
   public readonly name: string = "AbstractGlobalError";
   public readonly status: typeof HttpStatusCodeName;
   public readonly statusCode: (typeof allStatusCodesArray)[number];
   public readonly message: string;
   constructor(
      status: typeof HttpStatusCodeName,
      statusCode: HttpStatusCode,
      name: string,
      message?: string,
   ) {
      super(message);
      this.name = name;
      this.status = status;

      this.statusCode = statusCode;
      this.message = message || HttpStatusCodeName[statusCode];
      Object.setPrototypeOf(this, new.target.prototype);
   }
}

export default AbstractGlobalError;
