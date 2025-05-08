import { ZodSchema } from "zod";
import { Result } from "../../utils/result.util";
import regex from "../../utils/regex.util";
import AbstractGlobalError from "../../helpers/errors/global.error";
import IAbstractGlobalValidator from "./interface";

class AbstractGlobalValidator implements IAbstractGlobalValidator {
  validatePayload<T extends ZodSchema>(
    payload: any,
    schema: T,
  ): Result<any, AbstractGlobalError> {
    if (!payload) {
      return {
        ok: false,
        error: new AbstractGlobalError(
          "BAD_REQUEST",
          400,
          "AbstractGlobalValidator",
          "Payload is required",
        ),
      };
    }
    if (!schema.safeParse(payload).success) {
      return {
        ok: false,
        error: new AbstractGlobalError(
          "BAD_REQUEST",
          400,
          "AbstractGlobalValidator",
          "Invalid payload",
        ),
      };
    }
    return { ok: true, value: payload };
  }
  validateUUID(uuid: string): Result<string, AbstractGlobalError> {
    if (!regex.uuid.test(uuid)) {
      return {
        ok: false,
        error: new AbstractGlobalError(
          "BAD_REQUEST",
          400,
          "AbstractGlobalValidator",
          "Invalid UUID",
        ),
      };
    }
    return { ok: true, value: uuid };
  }
}

export default AbstractGlobalValidator;
