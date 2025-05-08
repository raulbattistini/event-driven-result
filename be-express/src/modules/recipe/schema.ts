import { z } from "zod";
import IngredientSchema from "../ingredient/schema";

const RecipeSchema = z.object({
   id: z.number().int(),
   authorId: z.string().max(50),
   recipeId: z.string().max(50),
   title: z.string().max(255),
   description: z.string().max(255),
   instructions: z.string().max(255),
   ingredients: z.array(IngredientSchema),
   cookingTime: z.number().positive(),
   prepTime: z.number().positive(),
   servings: z.number().positive(),
   calories: z.number().positive(),
   fat: z.number().positive(),
   carbohydrates: z.number().positive(),
   protein: z.number().positive(),
   imageUrl: z.string().max(255),
   createdAt: z.date().default(() => new Date()),
   updatedAt: z.date().default(() => new Date()),
   isDeleted: z.boolean().default(false),
   isReported: z.boolean().default(false),
});

export type RECIPE_SCHEMA = z.infer<typeof RecipeSchema>;

export default RecipeSchema;
