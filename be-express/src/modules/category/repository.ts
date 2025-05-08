import { ZodNumber } from "zod";
import { Result } from "../../shared/utils/helpers/result.util";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import Category from "./entity";
import ICategoryRepositry from "./interfaces/repository.interface";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";
import { DataSource, Repository } from "typeorm";

class CategoryRepository implements ICategoryRepositry {
   private repository: Repository<Category>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Category);
   }
   async getAll(): Promise<Result<Partial<Category>[], AbstractGlobalError>> {
      try {
         const categories = await this.repository.find();
         if (!categories || categories.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No categories found"),
            };
         }
         return {
            ok: true,
            value: categories,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<Category>, AbstractGlobalError>> {
      try {
         const category = await this.repository.findOneBy({ id: Number(id) });
         if (!category) {
            return {
               ok: false,
               error: new RepositoryError(404, "No categories found"),
            };
         }
         return {
            ok: true,
            value: category,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async findByName(
      name: Category["categoryName"],
   ): Promise<Result<Partial<any>, AbstractGlobalError>> {
      try {
         const category = await this.repository.findOneBy({
            categoryName: name,
         });
         if (!category) {
            return {
               ok: false,
               error: new RepositoryError(404, "No categories found"),
            };
         }
         return {
            ok: true,
            value: category,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async findDeleted(): Promise<Result<Partial<any>[], AbstractGlobalError>> {
      try {
         const category = await this.repository.findBy({ isDeleted: true });
         if (!category) {
            return {
               ok: false,
               error: new RepositoryError(404, "No categories found"),
            };
         }
         return {
            ok: true,
            value: category,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async create(
      entity: Partial<Category>,
   ): Promise<Result<Partial<Category>, AbstractGlobalError>> {
      try {
         let category = this.repository.create(entity);
         category = await this.repository.save(category);

         if (!category) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating category"),
            };
         }
         return {
            ok: true,
            value: category,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Partial<Category>>,
   ): Promise<Result<Partial<Category>, AbstractGlobalError>> {
      try {
         const updatedCategory = await this.repository.update(id, entity);
         if (!updatedCategory) {
            return {
               ok: false,
               error: new RepositoryError(404, "Error updating category"),
            };
         }
         const category = await this.repository.findOneBy({ id: Number(id) });
         return {
            ok: true,
            value: category!,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const category = await this.repository.findOneBy({ id: Number(id) });
         if (!category) {
            return {
               ok: false,
               error: new RepositoryError(404, "No categories found"),
            };
         }
         const _deletedCategory = await this.repository.delete(id);
         return {
            ok: true,
            value: void 0,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
}

export default CategoryRepository;
