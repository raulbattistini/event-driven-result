import { ZodNumber, ZodSchema } from "zod";
import { Result } from "../../utils/helpers/result.util";
import AbstractGlobalError from "../../utils/helpers/errors/global.error";

interface IAbstractGlobalValidator<T extends ZodSchema> {
   schema: T;
   validatePayload(
      payload: any,
      schema: ZodSchema,
   ): Result<void, AbstractGlobalError>;
   validateUUID(uuid: string): Result<string, AbstractGlobalError>;
   validateNumberId(
      id: ZodNumber | number,
   ): Result<number, AbstractGlobalError>;
   toResponse<T>(
      data: Array<T | Partial<T>>,
   ): Result<Array<Partial<T>> | Array<T>, AbstractGlobalError>;
}

export default IAbstractGlobalValidator;
