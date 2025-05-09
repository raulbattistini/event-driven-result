import IAbstractGlobalValidator from "../../../shared/abstract/validator/interface";
import { RECIPE_TIME_TYPES_ENUM } from "../../../shared/enums/recipe_time_types.enum";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import RecipeSchema from "../schema";

interface IRecipeValidator
   extends IAbstractGlobalValidator<typeof RecipeSchema> {
   schema: typeof RecipeSchema;
   validateTitle: (title: string) => Result<string, AbstractGlobalError>;
   validateDescription: (
      description: string,
   ) => Result<string, AbstractGlobalError>;
   validateTimestamp: (
      timestamp: string,
   ) => Result<string, AbstractGlobalError>;
   validateTimeType: (
      type: string,
   ) => Result<RECIPE_TIME_TYPES_ENUM, AbstractGlobalError>;
}

export default IRecipeValidator;
