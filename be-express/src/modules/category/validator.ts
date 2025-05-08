import CategoriesEnum, {
   CATEGORIES_ENUM,
} from "../../shared/enums/categories.enum";
import { Result } from "../../shared/utils/helpers/result.util";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { regex } from "../../shared/utils/helpers/regex.util";
import ICategoryValidator from "./interfaces/validator.interface";
import CategorySchema from "./schema";

class CategoriaValidator implements ICategoryValidator {
   validatePayload(
      payload: any,
      schema: typeof CategorySchema,
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
   validateCategoria(
      categoria: string,
   ): Result<CATEGORIES_ENUM, AbstractGlobalError> {
      if (!categoria) {
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
      if (CategoriesEnum.options.includes(categoria as any)) {
         return {
            ok: true,
            value: categoria as CATEGORIES_ENUM,
         };
      }
      return {
         ok: false,
         error: new AbstractGlobalError(
            "BAD_REQUEST",
            400,
            "Invalid value",
            "Invalid category",
         ),
      };
   }
}
export default CategoriaValidator;
