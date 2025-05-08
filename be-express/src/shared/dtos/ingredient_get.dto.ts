import Ingredient from "../../modules/ingredient/entity";
// import IngredientSchema from "../../modules/ingredient/schema";
//
// const IngredientNote = IngredientSchema.pick({ note: true });
// export type IngredientNote = typeof IngredientNote.shape.note;
export type IngredientNoteDto = Pick<Ingredient, "note">;
