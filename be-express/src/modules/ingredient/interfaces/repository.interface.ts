import { Result } from "../../../shared/utils/helpers/result.util";
import IAbstractRepository from "../../../shared/abstract/repository/interface";
import Ingredient from "../entity";
import IngredientSchema from "../schema";
import { IngredientNoteDto } from "../../../shared/dtos/ingredient_get.dto";

type IngredientID = typeof IngredientSchema.shape.id;
interface IIngredientsRepository
   extends IAbstractRepository<Ingredient, Partial<Ingredient>, IngredientID> {
   getNotes(id: IngredientID): Promise<Result<IngredientNoteDto, Error>>;
}
export default IIngredientsRepository;
