import { z } from "zod";

const CategoriesEnum = z.enum([
   "AppetizersMain ",
   "CoursesSide",
   "Dishes ",
   "Desserts",
   "Soups",
   "Stews",
   "Salads",
   "Breakfast",
   "Brunch",
   "Snacks",
   "Beverages",
]);
export default CategoriesEnum;
export type CATEGORIES_ENUM = z.infer<typeof CategoriesEnum>;
