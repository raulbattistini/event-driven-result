import IRecipeValidator from "./interfaces/validator.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import RecipeSchema from "./schema";
import { isDate } from "date-fns";
import { Result } from "../../shared/utils/helpers/result.util";
import { regex } from "../../shared/utils/helpers/regex.util";
import { ZodNumber } from "zod";
import RecipeTimeTypes, {
   RECIPE_TIME_TYPES_ENUM,
} from "../../shared/enums/recipe_time_types.enum";

class RecipeValidator implements IRecipeValidator {
   public schema = RecipeSchema;
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
   toResponse<Recipe>(
      data: Array<Recipe> | Array<Partial<Recipe>>,
   ): Result<Array<Partial<Recipe>>, AbstractGlobalError> {
      return {
         ok: true,
         value: instanceToPlain(data),
      };
   }
   validateTimestamp(timestamp: string): Result<string, AbstractGlobalError> {
      const isValid = isDate(new Date(timestamp));
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid timestamp format",
            ),
         };
      }
      return { ok: true, value: timestamp };
   }
   validateDescription(
      description: string,
   ): Result<string, AbstractGlobalError> {
      if (!description) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Description is required",
            ),
         };
      }
      if (description.length < 10 || description.length > 500) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Description must be between 10 and 500 characters long",
            ),
         };
      }
      return { ok: true, value: description };
   }
   validateNumberId(
      id: ZodNumber | number,
   ): Result<number, AbstractGlobalError> {
      if (typeof id === "number") {
         if (id <= 0) {
            return {
               ok: false,
               error: new AbstractGlobalError(
                  "BAD_REQUEST",
                  400,
                  "Invalid value",
                  "ID must be a positive number",
               ),
            };
         }
      }
      return { ok: true, value: Number(id) };
   }
   validateTimeType(
      type: string,
   ): Result<RECIPE_TIME_TYPES_ENUM, AbstractGlobalError> {
      const isValid = Object.values(RecipeTimeTypes).includes(
         type as RECIPE_TIME_TYPES_ENUM,
      );
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid time type format",
            ),
         };
      }
      return { ok: true, value: type as RECIPE_TIME_TYPES_ENUM };
   }
}

export default RecipeValidator;
