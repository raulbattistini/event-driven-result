import { Result } from "../../../shared/utils/helpers/result.util";
import IAbstractRepository from "../../../shared/abstract/repository/interface";
import User from "../entity";
import UserSchema from "../schema";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";

type UserID = typeof UserSchema.shape.id;
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
