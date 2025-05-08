import { z } from "zod";

const RatingSchema = z.object({
   id: z.number().int(),
   authorId: z.string().uuid().optional(),
   recipeId: z.string().uuid().optional(),
   rating: z.number().min(1).max(5).optional(),
   comment: z.string().max(255).optional(),
   createdAt: z.date().default(() => new Date()),
   updatedAt: z.date().default(() => new Date()),
   isDeleted: z.boolean().default(false),
   isReported: z.boolean().default(false),
});

export type RATING = z.infer<typeof RatingSchema>;

export default RatingSchema;
