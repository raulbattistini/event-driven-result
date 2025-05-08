import { DataSource, Repository } from "typeorm";
import IRecipeRepository from "./interfaces/repository.interface";
import Recipe from "./entity";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { Result } from "../../shared/utils/helpers/result.util";
import { ZodNumber } from "zod";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class RecipeRepository implements IRecipeRepository {
   private repository: Repository<Recipe>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Recipe);
   }
   async getAll(): Promise<Result<Partial<Recipe>[], AbstractGlobalError>> {
      try {
         const recipes = await this.repository.find();
         if (!recipes || recipes.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No recipes found"),
            };
         }
         return {
            ok: true,
            value: recipes,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getRecipeByAuthorId(
      authorId: string,
   ): Promise<
      Result<Partial<Recipe> | Array<Partial<Recipe>>, AbstractGlobalError>
   > {
      try {
         const recipe = await this.repository.findBy({ authorId });
         if (!recipe || recipe.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No recipes found"),
            };
         }

         return {
            ok: true,
            value: recipe,
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
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const recipe = await this.repository.findOneBy({ id: Number(id) });
         if (!recipe) {
            return {
               ok: false,
               error: new RepositoryError(404, "No recipes found"),
            };
         }

         return {
            ok: true,
            value: recipe,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }

   async create(
      entity: Partial<Recipe>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         let recipe = this.repository.create(entity);
         recipe = await this.repository.save(recipe);

         if (!recipe) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating recipe"),
            };
         }
         return {
            ok: true,
            value: recipe,
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
      entity: Partial<Recipe>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const updatedRecipe = await this.repository.update(id, entity);

         if (!updatedRecipe.affected) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error updating recipe"),
            };
         }
         const recipe = (await this.repository.findOneBy({
            id: Number(id),
         })) as Recipe;

         return {
            ok: true,
            value: recipe,
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
         const recipe = await this.repository.findOneBy({ id: Number(id) });
         if (!recipe) {
            return {
               ok: false,
               error: new RepositoryError(404, "No recipes found"),
            };
         }

         const _deletedRecipe = await this.repository.delete(id);
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

export default RecipeRepository;
