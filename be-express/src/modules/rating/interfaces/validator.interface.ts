import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";

interface IRatingsValidator extends IAbstractGlobalValidator {
   validateRating: (rating: number) => Result<number, AbstractGlobalError>;
}

export default IRatingsValidator;
