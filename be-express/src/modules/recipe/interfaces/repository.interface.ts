import IAbstractRepository from "../../../shared/abstract/repository/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import Recipe from "../entity";
import RecipeSchema from "../schema";

type RecipeID = typeof RecipeSchema.shape.id;
interface IRecipeRepository
   extends IAbstractRepository<Recipe, Partial<Recipe>, RecipeID> {
   getRecipeByAuthorId: (
      authorId: string,
   ) => Promise<
      Result<Partial<Recipe> | Array<Partial<Recipe>>, AbstractGlobalError>
   >;
}

export default IRecipeRepository;
