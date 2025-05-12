import { z } from "zod";
import RolesEnum from "../../shared/enums/roles.enum";

const UserSchema = z.object({
   id: z.string().uuid(),
   name: z.string().max(50),
   username: z.string().min(3).max(50),
   email: z.string().email(),
   passwordHash: z.string(),
   avatarUrl: z.string().url(),
   password: z.string().min(8).max(255),
   role: RolesEnum,
   createdAt: z.date(),
});

export type USER_SCHEMA = z.infer<typeof UserSchema>;
export type UserID = typeof UserSchema.shape.id;

export default UserSchema;
