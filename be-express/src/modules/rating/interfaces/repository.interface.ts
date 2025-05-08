import IAbstractRepository from "../../../shared/abstract/repository/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import Rating from "../entity";
import RatingSchema from "../schema";

type RatingID = typeof RatingSchema.shape.id;
interface IRatingRepository
   extends IAbstractRepository<Rating, Partial<Rating>, RatingID> {
   findReported(): Promise<Result<Partial<Rating>[], AbstractGlobalError>>;
   findDeleted(): Promise<Result<Partial<Rating>[], AbstractGlobalError>>;
}

export default IRatingRepository;
