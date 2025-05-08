import IRatingsValidator from "./interfaces/validator.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import regex from "../../shared/utils/helpers/regex.util";
import RatingSchema from "./schema";
import { Result } from "../../shared/utils/helpers/result.util";

class RatingValidator implements IRatingsValidator {
   validatePayload(
      payload: any,
      schema: typeof RatingSchema,
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
   validateRating(rating: number): Result<number, AbstractGlobalError> {
      if (rating < 0 || rating > 5) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Rating must be between 0 and 5",
            ),
         };
      }
      return { ok: true, value: rating };
   }
}

export default RatingValidator;
