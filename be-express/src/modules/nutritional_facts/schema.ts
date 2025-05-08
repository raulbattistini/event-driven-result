import { z } from "zod";

const NutritionalFactsSchema = z.object({
   id: z.number().int(),
   recipeId: z.string().max(50),
   calories: z.number().positive(),
   fat: z.number().positive(),
   carbohydrates: z.number().positive(),
   protein: z.number().positive(),
   ingredients: z.string().max(255),
   notes: z.string().max(255),
   servings: z.number().positive(),
});

export type NUTRITIONAL_FACTS = z.infer<typeof NutritionalFactsSchema>;

export default NutritionalFactsSchema;
