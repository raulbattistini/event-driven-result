import { z } from "zod";

const FavoriteSchema = z.object({
   id: z.number().int(),
   authorId: z.string().max(50),
   recipeId: z.string().max(50),
   isDeleted: z.boolean(),
   isReported: z.boolean(),
   createdAt: z.date().default(() => new Date()),
   updatedAt: z.date().default(() => new Date()),
});

export default FavoriteSchema;
