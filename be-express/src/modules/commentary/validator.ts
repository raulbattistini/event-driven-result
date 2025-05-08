import { Result } from "../../shared/utils/helpers/result.util";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import regex from "../../shared/utils/helpers/regex.util";
import ICommentaryValidator from "./interfaces/validator.interface";
import CommentarySchema from "./schema";

class CommentaryValidator implements ICommentaryValidator {
   validatePayload(
      payload: any,
      schema: typeof CommentarySchema,
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
   // TODO validate if user has been reported
   validateUserId(userId: string): Result<string, AbstractGlobalError> {
      return {
         ok: true,
         value: userId,
      };
   }
}

export default CommentaryValidator;
