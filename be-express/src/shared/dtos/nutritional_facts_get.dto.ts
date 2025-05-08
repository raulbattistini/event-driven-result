// import { z } from "zod";
// import NutritionalFactsSchema from "../../modules/nutritional_facts/schema";
import NutritionalFacts from "../../modules/nutritional_facts/entity";

// const BaseNutritionalFactsDto = NutritionalFactsSchema.pick({
//    id: true,
//    recipeId: true,
//    calories: true,
//    fat: true,
//    carbohydrates: true,
//    protein: true,
// });
//
// export type NutritionalFactsGetDto = z.infer<typeof BaseNutritionalFactsDto>;

export type BaseNutritionalFactsDto = Pick<
   NutritionalFacts,
   "id" | "recipeId" | "calories" | "fat" | "carbohydrates" | "protein"
>;
