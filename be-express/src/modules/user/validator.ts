import IUserValidator from "./interfaces/validator.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { regex } from "../../shared/utils/helpers/regex.util";
import UserSchema from "./schema";
import RolesEnum, { ROLES_ENUM } from "../../shared/enums/roles.enum";
import { Result } from "../../shared/utils/helpers/result.util";
import passwordHash from "../../shared/utils/helpers/passwordHash";

class UserValidator implements IUserValidator {
   validatePayload(
      payload: any,
      schema: typeof UserSchema,
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
   validateRole(role: string): Result<string, AbstractGlobalError> {
      if (!role) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "No value",
               "Categoria is required",
            ),
         };
      }
      if (RolesEnum.options.includes(role as any)) {
         return {
            ok: true,
            value: role as ROLES_ENUM,
         };
      }
      return {
         ok: false,
         error: new AbstractGlobalError(
            "BAD_REQUEST",
            400,
            "Invalid value",
            "Invalid role",
         ),
      };
   }
   validateEmail(email: string): Result<string, AbstractGlobalError> {
      const isValid = regex.email.test(email);
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid email format",
            ),
         };
      }
      return { ok: true, value: email };
   }
   validatePassword(password: string): Result<string, AbstractGlobalError> {
      const isValid = regex.password.test(password);
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid password format",
            ),
         };
      }
      return { ok: true, value: passwordHash(password) };
   }
   validateUserName(username: string): Result<string, AbstractGlobalError> {
      if (username.length < 3 || username.length > 20) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid username format",
            ),
         };
      }
      const isValid = regex.username.test(username);
      if (!isValid) {
         return {
            ok: false,
            error: new AbstractGlobalError(
               "BAD_REQUEST",
               400,
               "Invalid value",
               "Invalid username format",
            ),
         };
      }
      return { ok: true, value: username };
   }
}

export default UserValidator;
