import IAbstractRepository from "../../../shared/abstract/repository/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import Category from "../entity";
import CategorySchema from "../schema";

type CategoryID = typeof CategorySchema.shape.id;
interface ICategoryRepositry
   extends IAbstractRepository<Category, Partial<Category>, CategoryID> {
   findDeleted(): Promise<Result<Partial<any>[], AbstractGlobalError>>;
   findByName(
      name: Category["categoryName"],
   ): Promise<Result<Partial<any>, AbstractGlobalError>>;
}

export default ICategoryRepositry;
