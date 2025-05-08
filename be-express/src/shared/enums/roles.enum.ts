import { z } from "zod";

const RolesEnum = z.enum([
   "MEMBER",
   "MODERATOR",
   "CONTRIBUTOR",
   "AUTHOR",
   "ADMIN",
   "NUTRITIONIST",
   "CHEF",
   "SUPPORT",
   "OWNER",
]);

export default RolesEnum;
export type ROLES_ENUM = z.infer<typeof RolesEnum>;
