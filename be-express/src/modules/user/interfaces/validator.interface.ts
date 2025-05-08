import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";

interface IUserValidator extends IAbstractGlobalValidator {
   validateUserName: (userName: string) => Result<string, AbstractGlobalError>;
   validatePassword: (password: string) => Result<string, AbstractGlobalError>;
   validateEmail: (email: string) => Result<string, AbstractGlobalError>;
   validateRole: (role: string) => Result<string, AbstractGlobalError>;
}

export default IUserValidator;
