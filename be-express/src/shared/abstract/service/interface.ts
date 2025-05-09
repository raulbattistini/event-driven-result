import { DeepPartial } from "typeorm";
import { regex } from "../../utils/helpers/regex.util";
import { Result } from "../../utils/helpers/result.util";
import AbstractGlobalError from "../../utils/helpers/errors/global.error";

interface IAbstractService<ObjID extends regex.IDUnion, T = DeepPartial<any>> {
   getAll: () => Promise<Result<T[], AbstractGlobalError>>;
   getById: (id: ObjID) => Promise<Result<T, AbstractGlobalError>>;
   create: (entity: T) => Promise<Result<T, AbstractGlobalError>>;
   update: (
      id: ObjID,
      entity: Partial<T>,
   ) => Promise<Result<T, AbstractGlobalError>>;
   delete: (id: ObjID) => Promise<Result<void, AbstractGlobalError>>;
}

export default IAbstractService;
