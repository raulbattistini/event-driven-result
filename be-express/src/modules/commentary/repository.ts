import { DataSource, Repository } from "typeorm";
import Commentary from "./entity";
import ICommentaryRepository from "./interfaces/repository.interface";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { Result } from "../../shared/utils/helpers/result.util";
import { ZodNumber } from "zod";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class CommentaryRepository implements ICommentaryRepository {
   private repository: Repository<Commentary>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Commentary);
   }
   async getAll(): Promise<Result<Partial<Commentary>[], AbstractGlobalError>> {
      try {
         const commentaries = await this.repository.find();
         if (!commentaries || commentaries.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         return {
            ok: true,
            value: commentaries,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching commentary", error),
         };
      }
   }
   async getDateComments(
      date: Date,
   ): Promise<Result<Partial<Commentary>[], AbstractGlobalError>> {
      try {
         const commentaries = await this.repository.findBy({ createdAt: date });
         if (!commentaries || commentaries.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         return {
            ok: true,
            value: commentaries,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching commentary", error),
         };
      }
   }
   async getUserComments(
      userId: string,
   ): Promise<Result<Partial<Commentary>[], AbstractGlobalError>> {
      try {
         const commentaries = await this.repository.findBy({ userId });
         if (!commentaries || commentaries.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         return {
            ok: true,
            value: commentaries,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching commentary", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<Commentary>, AbstractGlobalError>> {
      try {
         const commentary = await this.repository.findOneBy({ id: Number(id) });
         if (!commentary) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         return {
            ok: true,
            value: commentary,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching commentary", error),
         };
      }
   }
   async create(
      entity: Partial<Commentary>,
   ): Promise<Result<Partial<Commentary>, AbstractGlobalError>> {
      try {
         const commentary = await this.repository.findOneBy({
            id: Number(entity.id),
         });
         if (commentary) {
            return {
               ok: false,
               error: new RepositoryError(400, "Commentary already exists"),
            };
         }
         let newCommentary = this.repository.create(entity);
         newCommentary = await this.repository.save(entity);
         return {
            ok: true,
            value: newCommentary,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating commentary", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Partial<Commentary>>,
   ): Promise<Result<Partial<Commentary>, AbstractGlobalError>> {
      try {
         const commentary = await this.repository.findOneBy({ id: Number(id) });
         if (!commentary) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         const updatedCommentary = await this.repository.save({
            ...commentary,
            ...entity,
         });
         if (!updatedCommentary) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating commentary"),
            };
         }
         return {
            ok: true,
            value: updatedCommentary,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating commentary", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const commentary = await this.repository.findOneBy({ id: Number(id) });
         if (!commentary) {
            return {
               ok: false,
               error: new RepositoryError(404, "Commentaries not found"),
            };
         }
         let _deletedCommentary = await this.repository.delete({
            id: Number(id),
         });

         return {
            ok: true,
            value: undefined,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating commentary", error),
         };
      }
   }
}

export default CommentaryRepository;
