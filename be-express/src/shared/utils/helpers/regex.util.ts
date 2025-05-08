import { z } from "zod";
export namespace regex {
   interface IRegexValidator {
      isValid(value: string, regex: RegExp): boolean;
   }
   export class RegexValidator implements IRegexValidator {
      isValid(value: string, regex: RegExp): boolean {
         return regex.test(value);
      }
   }
   export const uuidV4 = z.string().uuid();
   export type UUID = z.infer<typeof uuidV4>;
   export const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   export const phone = /^\+?[1-9]\d{1,14}$/;
   export const postalCode = /^\d{5}(-\d{4})?$/;
   export const url = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
   export const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   export const username = /^[a-zA-Z0-9._-]{3,20}$/;
   export const date = /^\d{2}-\d{2}-\d{4}$/;
}
