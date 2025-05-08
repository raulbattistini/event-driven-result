import { z } from "zod";

const CommentarySchema = z.object({
   id: z.number().int(),
   userId: z.string().uuid(),
   createdAt: z.date(),
});

export type COMMENTARY = z.infer<typeof CommentarySchema>;

export default CommentarySchema;
