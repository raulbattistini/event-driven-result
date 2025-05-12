import { z } from "zod";

const RecipeTimeTypes = z.enum(["COOKING", "PREPARATION"]);
export default RecipeTimeTypes;
export type RECIPE_TIME_TYPES_ENUM = z.infer<typeof RecipeTimeTypes>;
