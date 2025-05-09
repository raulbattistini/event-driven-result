import IRecipeRepository from "./interfaces/repository.interface";
import IRecipeValidator from "./interfaces/validator.interface";
import IRecipeService from "./interfaces/service.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { Result } from "../../shared/utils/helpers/result.util";
import Recipe from "./entity";
import { ZodNumber } from "zod";
import { RECIPE_TIME_TYPES_ENUM } from "../../shared/enums/recipe_time_types.enum";
import Ingredient from "../ingredient/entity";
import { NUTRITIONAL_FACTS } from "../nutritional_facts/schema";

class RecipeService implements IRecipeService {
   constructor(
      private recipeValidator: IRecipeValidator,
      private recipeRepository: IRecipeRepository,
   ) {}

   async getAll(): Promise<Result<Partial<Recipe>[], AbstractGlobalError>> {
      try {
         const recipes = await this.recipeRepository.getAll();
         if (!recipes.ok) {
            return {
               ok: false,
               error: recipes.error,
            };
         }
         const recipeList = this.recipeValidator.toResponse(recipes.value);
         if (!recipeList.ok) {
            return {
               ok: false,
               error: recipeList.error,
            };
         }
         return {
            ok: true,
            value: recipeList.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const validationResult = this.recipeValidator.validateNumberId(
            Number(id),
         );
         if (!validationResult.ok) {
            return {
               ok: false,
               error: validationResult.error,
            };
         }
         const recipe = await this.recipeRepository.getById(id);
         if (!recipe.ok) {
            return {
               ok: false,
               error: recipe.error,
            };
         }
         return {
            ok: true,
            value: recipe.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async create(
      entity: Partial<Recipe>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const validatedRecipe = this.recipeValidator.validatePayload(
            entity,
            this.recipeValidator.schema,
         );
         if (!validatedRecipe.ok) {
            return {
               ok: false,
               error: validatedRecipe.error,
            };
         }
         const recipe = await this.recipeRepository.create(entity);
         if (!recipe.ok) {
            return {
               ok: false,
               error: recipe.error,
            };
         }
         return {
            ok: true,
            value: recipe.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Partial<Recipe>>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const validateUUID = this.recipeValidator.validateNumberId(Number(id));
         const validatePayload = this.recipeValidator.validatePayload(
            entity,
            this.recipeValidator.schema,
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
         const recipe = await this.recipeRepository.update(id, entity);
         if (!recipe.ok) {
            return {
               ok: false,
               error: recipe.error,
            };
         }
         return {
            ok: true,
            value: recipe.value,
         };
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const validateUUID = this.recipeValidator.validateNumberId(Number(id));
         if (!validateUUID.ok) {
            return {
               ok: false,
               error: validateUUID.error,
            };
         }
         const recipe = await this.recipeRepository.delete(id);
         if (!recipe.ok) {
            return {
               ok: false,
               error: recipe.error,
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
   async filterByTime(
      time: number,
      type: RECIPE_TIME_TYPES_ENUM,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
         const validateTime = this.recipeValidator.validateNumberId(time);
         const validateType = this.recipeValidator.validateTimeType(type);
         if (!validateTime.ok) {
            return {
               ok: false,
               error: validateTime.error,
            };
         }
         if (!validateType.ok) {
            return {
               ok: false,
               error: validateType.error,
            };
         }
         // create auxiliar function to convert time to seconds
         const recipes = await this.recipeRepository.filterByTime(time, type);
         if (!recipes.ok) {
            return {
               ok: false,
               error: recipes.error,
            };
         }
         const recipeList = this.recipeValidator.toResponse(recipes.value);
         if (!recipeList.ok) {
            return {
               ok: false,
               error: recipeList.error,
            };
         }
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async filterByIngredients(
      ingredients: Array<Ingredient> | Array<Partial<Ingredient>>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }

   async filterByNutritionalFacts(
      nutritionalFacts: Partial<NUTRITIONAL_FACTS> | NUTRITIONAL_FACTS,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
   async creationTime(
      startTime: Date,
      endTime: Date,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>> {
      try {
      } catch (error) {
         return {
            ok: false,
            error: new AbstractGlobalError("Internal Server Error", 500, error),
         };
      }
   }
}

export default RecipeService;
