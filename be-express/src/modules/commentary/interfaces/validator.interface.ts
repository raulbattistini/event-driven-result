import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";

interface ICommentaryValidator extends IAbstractGlobalValidator {
   validateUserId(userId: string): Result<string, AbstractGlobalError>; // validates if comment is reported
}

export default ICommentaryValidator;
