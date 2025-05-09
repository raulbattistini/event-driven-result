import User from "../entity";
import IAbstractService from "../../../shared/abstract/service/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { UserID } from "../schema";
import { Result } from "../../../shared/utils/helpers/result.util";

interface IUserService extends IAbstractService<UserID, Partial<User>> {
   getUserByUsername: (
      username: string,
   ) => Promise<Result<Partial<User>, AbstractGlobalError>>;
   getUserByEmail: (
      email: string,
   ) => Promise<Result<Partial<User>, AbstractGlobalError>>;
}
export default IUserService;
