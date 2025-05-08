import INutritionalFactsValidator from "./interfaces/validator.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import regex from "../../shared/utils/helpers/regex.util";
import NutritionalFactsSchema from "./schema";
import { Result } from "../../shared/utils/helpers/result.util";

class NutritionalFactsValidator implements INutritionalFactsValidator {
   validatePayload(
      payload: any,
      schema: typeof NutritionalFactsSchema,
   ): Result<void, AbstractGlobalError> {
      if (!schema) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "No schema",
               "Schema not provided",
            ),
         };
      }
      const validationResult = schema.safeParse(payload);
      if (!validationResult.success) {
         const errors = validationResult.error.errors.map(
            (error: any) => error.message,
         );
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "No schema",
               errors.join(", "),
            ),
         };
      }
      return { ok: true, value: payload };
   }
   validateUUID(uuid: string): Result<string, AbstractGlobalError> {
      const isValid = regex.uuid.test(uuid);
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid UUID format",
            ),
         };
      }
      return { ok: true, value: uuid };
   }
   validateServings(servings: number): Result<number, AbstractGlobalError> {
      if (servings <= 0) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Servings must be greater than 0",
            ),
         };
      }
      if (servings > 100) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Servings must be less than or equal to 100",
            ),
         };
      }
      return { ok: true, value: servings };
   }
}

export default NutritionalFactsValidator;
