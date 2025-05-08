import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { CATEGORIES_ENUM } from "../../../shared/enums/categories.enum";
import { Result } from "../../../shared/utils/helpers/result.util";

interface ICategoryValidator extends IAbstractGlobalValidator {
   validateCategoria: (
      categoria: string,
   ) => Result<CATEGORIES_ENUM, AbstractGlobalError>;
}

export default ICategoryValidator;
