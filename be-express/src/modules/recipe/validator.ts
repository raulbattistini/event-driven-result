import IRecipeValidator from "./interfaces/validator.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import regex from "../../shared/utils/helpers/regex.util";
import RecipeSchema from "./schema";
import { Result } from "../../shared/utils/helpers/result.util";

class RecipeValidator implements IRecipeValidator {
   validatePayload(
      payload: any,
      schema: typeof RecipeSchema,
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
   validateTitle(title: string): Result<string, AbstractGlobalError> {
      if (!title) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Title is required",
            ),
         };
      }

      if (title.length < 3 || title.length > 50) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Title must be between 3 and 50 characters long",
            ),
         };
      }

      return { ok: true, value: title };
   }
}

export default RecipeValidator;
