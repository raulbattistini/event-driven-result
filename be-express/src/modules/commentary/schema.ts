import { z } from "zod";

const CommentarySchema = z.object({
   id: z.number().int(),
   userId: z.string().uuid(),
   createdAt: z.date(),
   title: z.string().max(50),
   commentary: z.string().max(255),
});

export type COMMENTARY = z.infer<typeof CommentarySchema>;

export default CommentarySchema;
