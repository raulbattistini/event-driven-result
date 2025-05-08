import IAbstractRepository from "../../../shared/abstract/repository/interface";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import Commentary from "../entity";
import CommentarySchema from "../schema";

type CommentaryID = typeof CommentarySchema.shape.id;
interface ICommentaryRepository
   extends IAbstractRepository<Commentary, Partial<Commentary>, CommentaryID> {
   getUserComments(
      userId: string,
   ): Promise<Result<Partial<Commentary>[], AbstractGlobalError>>;
   getDateComments(
      date: Date,
   ): Promise<Result<Partial<Commentary>[], AbstractGlobalError>>;
   fuzzySearch(
      txt: string,
   ): Promise<Result<Partial<Commentary>[], AbstractGlobalError>>;
}
export default ICommentaryRepository;
