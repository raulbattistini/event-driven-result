import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";

interface INutritionalFactsValidator extends IAbstractGlobalValidator {
   validateServings: (servings: number) => Result<number, AbstractGlobalError>;
}

export default INutritionalFactsValidator;
