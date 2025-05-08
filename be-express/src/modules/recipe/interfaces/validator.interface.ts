import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";

interface IRecipeValidator extends IAbstractGlobalValidator {
   validateTitle: (title: string) => Result<string, AbstractGlobalError>;
}

export default IRecipeValidator;
