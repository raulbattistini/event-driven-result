import { z } from "zod";

const ErrorLevels = z.enum(["INFO", "WARN", "ERROR", "CRITICAL", "DEBUG"]);
export default ErrorLevels;
export type ERRORS_LEVELS_ENUM = z.infer<typeof ErrorLevels>;
