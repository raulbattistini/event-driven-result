import { ZodSchema } from "zod";
import { Result } from "../../utils/helpers/result.util";
import AbstractGlobalError from "../../utils/helpers/errors/global.error";

interface IAbstractGlobalValidator {
   validatePayload(
      payload: any,
      schema: ZodSchema,
   ): Result<void, AbstractGlobalError>;
   validateUUID(uuid: string): Result<string, AbstractGlobalError>;
}

export default IAbstractGlobalValidator;
