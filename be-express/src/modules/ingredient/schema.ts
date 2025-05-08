import { z } from "zod";

const IngredientSchema = z.object({
   id: z.number().int(),
   recipeId: z.string().max(50),
   title: z.string().max(50),
   ingredientId: z.string().max(255),
   quantity: z.number().positive(),
   note: z.string().max(255),
});

export type INGREDIENT_SCHEMA = z.infer<typeof IngredientSchema>;

export default IngredientSchema;
