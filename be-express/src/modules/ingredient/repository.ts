import { DataSource, Repository } from "typeorm";
import { Result } from "../../shared/utils/helpers/result.util";
import { ZodNumber } from "zod";
import { IngredientNoteDto } from "../../shared/dtos/ingredient_get.dto";
import Ingredient from "./entity";
import IIngredientsRepository from "./interfaces/repository.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class IngredientRepository implements IIngredientsRepository {
   private repository: Repository<Ingredient>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Ingredient);
   }

   async getNotes(
      id: ZodNumber,
   ): Promise<Result<IngredientNoteDto, AbstractGlobalError>> {
      try {
         const ingredient = await this.repository.findOneBy({ id: Number(id) });
         if (!ingredient) {
            return {
               ok: false,
               error: new RepositoryError(404, "Ingredient not found"),
            };
         }
         const notes = ingredient.note;
         return {
            ok: true,
            value: { note: notes },
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<Ingredient>, AbstractGlobalError>> {
      try {
         const ingredient = await this.repository.findOneBy({ id: Number(id) });
         if (!ingredient) {
            return {
               ok: false,
               error: new RepositoryError(404, "Ingredient not found"),
            };
         }
         return {
            ok: true,
            value: ingredient,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async getAll(): Promise<Result<Partial<Ingredient>[], AbstractGlobalError>> {
      try {
         const ingredients = await this.repository.find();
         if (!ingredients || ingredients.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Ingredients not found"),
            };
         }
         return {
            ok: true,
            value: ingredients,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }

   async create(
      entity: Partial<Ingredient>,
   ): Promise<Result<Partial<Ingredient>, AbstractGlobalError>> {
      try {
         let ingredient = await this.repository.findOneBy({
            id: Number(entity.id),
         });
         if (ingredient) {
            return {
               ok: false,
               error: new RepositoryError(409, "Ingredient already exists"),
            };
         }
         ingredient = this.repository.create(entity);
         const createdIngredient = await this.repository.save(ingredient);
         if (!createdIngredient) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating ingredient"),
            };
         }
         return {
            ok: true,
            value: createdIngredient,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Ingredient>,
   ): Promise<Result<Partial<Ingredient>, AbstractGlobalError>> {
      try {
         const ingredient = await this.repository.findOneBy({ id: Number(id) });
         if (!ingredient) {
            return {
               ok: false,
               error: new RepositoryError(404, "Ingredient not found"),
            };
         }
         const updatedIngredient = await this.repository.save({
            ...ingredient,
            ...entity,
         });
         if (!updatedIngredient) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error updating ingredient"),
            };
         }
         return {
            ok: true,
            value: updatedIngredient,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const ingredient = await this.repository.findOneBy({ id: Number(id) });
         if (!ingredient) {
            return {
               ok: false,
               error: new RepositoryError(404, "Ingredient not found"),
            };
         }
         const deletedIngredient = await this.repository.delete(Number(id));
         if (!deletedIngredient) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error deleting ingredient"),
            };
         }
         return {
            ok: true,
            value: void 0,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
}

export default IngredientRepository;
