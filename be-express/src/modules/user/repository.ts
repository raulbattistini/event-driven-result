import { DataSource, Repository } from "typeorm";
import { ZodString } from "zod";
import { Result } from "../../shared/utils/helpers/result.util";
import User from "./entity";
import IUserRepository from "./interfaces/repository.interface";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";
import ValidationError from "../../shared/utils/helpers/errors/classes/validation.error";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";

class UserRepository implements IUserRepository {
   private repository: Repository<User>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(User);
   }
   async getAll(): Promise<Result<Partial<User>[], AbstractGlobalError>> {
      try {
         const users = await this.repository.find();
         if (!users || users.length === 0) {
            return {
               ok: false,
               error: new ValidationError(404, "No users found"),
            };
         }

         return {
            ok: true,
            value: users,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching users", error),
         };
      }
   }
   async getById(
      id: ZodString,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const user = await this.repository.findOneBy({ id });
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "User not found"),
            };
         }
         return {
            ok: true,
            value: user,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getUserByEmail(
      email: string,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const user = await this.repository.findOneBy({ email });
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "Email not found"),
            };
         }
         return {
            ok: true,
            value: user,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getUserByUsername(
      username: string,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         const user = await this.repository.findOneBy({ username });
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "Email not found"),
            };
         }
         return {
            ok: true,
            value: user,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async create(
      entity: Partial<User>,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         let user = this.repository.create(entity);
         user = await this.repository.save(entity);
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "Email not found"),
            };
         }
         return {
            ok: true,
            value: user,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async update(
      id: User["id"],
      entity: Partial<User>,
   ): Promise<Result<Partial<User>, AbstractGlobalError>> {
      try {
         let user = await this.repository.findOneBy(id);
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "Email not found"),
            };
         }
         const _updatedValue = await this.repository.update(id, entity);
         user = await this.repository.findOneBy(entity.id);
         return {
            ok: true,
            value: user!,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async delete(id: ZodString): Promise<Result<void, AbstractGlobalError>> {
      try {
         const user = await this.repository.findOneBy({ id });
         if (!user) {
            return {
               ok: false,
               error: new ValidationError(404, "Email not found"),
            };
         }
         const _deletedUser = await this.repository.delete(id._input);
         return {
            ok: true,
            value: undefined,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
}

export default UserRepository;
