import IAbstractService from "../../../shared/abstract/service/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import Recipe from "../entity";
import Ingredient from "../../ingredient/entity";
import { NUTRITIONAL_FACTS } from "../../nutritional_facts/schema";
import { RecipeID } from "../schema";
import { Result } from "../../../shared/utils/helpers/result.util";
import { RECIPE_TIME_TYPES_ENUM } from "../../../shared/enums/recipe_time_types.enum";

interface IRecipeInterface extends IAbstractService<RecipeID, Partial<Recipe>> {
   filterByNutritionalFacts(
      nutritionalFacts: Partial<NUTRITIONAL_FACTS> | NUTRITIONAL_FACTS,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>>;
   filterByIngredients(
      ingredients: Array<Ingredient> | Array<Partial<Ingredient>>,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>>;
   filterByTime(
      time: number,
      type: RECIPE_TIME_TYPES_ENUM,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>>;
   creationTime(
      startTime: Date,
      endTime: Date,
   ): Promise<Result<Partial<Recipe>, AbstractGlobalError>>;
}
export default IRecipeInterface;
