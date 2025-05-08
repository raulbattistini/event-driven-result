import { z } from "zod";
import CategoriesEnum from "../../shared/enums/categories.enum";

const CategorySchema = z.object({
   id: z.number().int(),
   categoryId: z.string().max(50),
   categoryName: CategoriesEnum,
   imageUrl: z.string().max(255),
   description: z.string().max(255),
   isDeleted: z.boolean(),
});

export type CATEGORY_SCHEMA = z.infer<typeof CategorySchema>;

export default CategorySchema;
