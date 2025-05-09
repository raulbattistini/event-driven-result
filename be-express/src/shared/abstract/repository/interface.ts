import { DeepPartial } from "typeorm";
import { regex } from "../../utils/helpers/regex.util";
import { Result } from "../../utils/helpers/result.util";
import { ZodNumber } from "zod";
import AbstractGlobalError from "../../utils/helpers/errors/global.error";

interface IAbstractRepository<
   T,
   S extends Partial<T> | DeepPartial<T>,
   ID extends ZodNumber | typeof regex.uuidV4,
> {
   getAll: () => Promise<Result<S[], AbstractGlobalError>>;
   getById: (id: ID) => Promise<Result<S, AbstractGlobalError>>;
   create: (entity: S) => Promise<Result<S, AbstractGlobalError>>;
   update: (
      id: ID,
      entity: Partial<S>,
   ) => Promise<Result<S, AbstractGlobalError>>;
   delete: (id: ID) => Promise<Result<void, AbstractGlobalError>>;
}

export default IAbstractRepository;
