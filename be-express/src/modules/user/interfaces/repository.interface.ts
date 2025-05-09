import { Result } from "../../../shared/utils/helpers/result.util";
import { UserID } from "../schema";
import IAbstractRepository from "../../../shared/abstract/repository/interface";
import User from "../entity";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";

interface IUserRepository
   extends IAbstractRepository<User, Partial<User>, UserID> {
   getUserByUsername: (
      username: string,
   ) => Promise<Result<Partial<User>, AbstractGlobalError>>;
   getUserByEmail: (
      email: string,
   ) => Promise<Result<Partial<User>, AbstractGlobalError>>;
}

export default IUserRepository;
