import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import User from "./entity";
import IUserService from "./interfaces/service.interface";
import IUserRepository from "./interfaces/repository.interface";
import IUserValidator from "./interfaces/validator.interface";
import { Result } from "../../shared/utils/helpers/result.util";
import { ZodString } from "zod";

class UserService implements IUserService {
   constructor(
      private userRepository: IUserRepository,
      private userValidator: IUserValidator,
   ) {}

   async getUserByEmail(
      email: string,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const validationResult = this.userValidator.validateEmail(email);
         if (!validationResult.ok) {
            return {
               ok: false,
               error: validationResult.error,
            };
         }
         const user = await this.userRepository.getUserByEmail(email);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: user.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }

   async getUserByUsername(
      username: string,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const validationResult = this.userValidator.validateUserName(username);
         if (!validationResult.ok) {
            return {
               ok: false,
               error: validationResult.error,
            };
         }
         const user = await this.userRepository.getUserByUsername(username);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: user.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }

   async getAll(): Promise<Result<Partial<User>[], AbstractGlobalError>> {
      try {
         const users = await this.userRepository.getAll();
         if (!users.ok) {
            return {
               ok: false,
               error: users.error,
            };
         }
         const userList = this.userValidator.toResponse(users.value);
         if (!userList.ok) {
            return {
               ok: false,
               error: userList.error,
            };
         }
         return {
            ok: true,
            value: userList.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async getById(
      id: ZodString,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const validationResult = this.userValidator.validateUUID(String(id));
         if (!validationResult.ok) {
            return {
               ok: false,
               error: validationResult.error,
            };
         }
         const user = await this.userRepository.getById(id);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: user.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async create(
      entity: Partial<User>,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const validatetionResult = this.userValidator.validatePayload(
            entity,
            this.userValidator.schema,
         );
         if (!validatetionResult.ok) {
            return {
               ok: false,
               error: validatetionResult.error,
            };
         }
         const user = await this.userRepository.create(entity);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: user.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async update(
      id: ZodString,
      entity: Partial<Partial<User>>,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const validateUUID = this.userValidator.validateUUID(String(id));
         const validatePayload = this.userValidator.validatePayload(
            entity,
            this.userValidator.schema,
         );
         if (!validateUUID.ok) {
            return {
               ok: false,
               error: validateUUID.error,
            };
         }
         if (!validatePayload.ok) {
            return {
               ok: false,
               error: validatePayload.error,
            };
         }
         const user = await this.userRepository.update(id, entity);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: user.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async delete(id: ZodString): Promise<Result<void, AbstractGlobalError>> {
      try {
         const validateUUID = this.userValidator.validateUUID(String(id));
         if (!validateUUID.ok) {
            return {
               ok: false,
               error: validateUUID.error,
            };
         }
         const user = await this.userRepository.delete(id);
         if (!user.ok) {
            return {
               ok: false,
               error: user.error,
            };
         }
         return {
            ok: true,
            value: undefined,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
}

export default UserService;
