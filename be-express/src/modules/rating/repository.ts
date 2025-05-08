import { ZodNumber } from "zod";
import { DataSource, Repository } from "typeorm";
import { Result } from "../../shared/utils/helpers/result.util";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import Rating from "./entity";
import IRatingRepository from "./interfaces/repository.interface";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class RatingRepository implements IRatingRepository {
   private repository: Repository<Rating>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Rating);
   }
   async findDeleted(): Promise<
      Result<Partial<Rating>[], AbstractGlobalError>
   > {
      try {
         const deletedRatings = await this.repository.findBy({
            isDeleted: true,
         });
         if (!deletedRatings || deletedRatings.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No deleted ratings found"),
            };
         }
         return {
            ok: true,
            value: deletedRatings,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async findReported(): Promise<
      Result<Partial<Rating>[], AbstractGlobalError>
   > {
      try {
         const reportedRatings = await this.repository.findBy({
            isReported: true,
         });
         if (!reportedRatings || reportedRatings.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No deleted ratings found"),
            };
         }
         return {
            ok: true,
            value: reportedRatings,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async getAll(): Promise<Result<Partial<Rating>[], AbstractGlobalError>> {
      try {
         const ratings = await this.repository.find();
         if (!ratings || ratings.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         return {
            ok: true,
            value: ratings,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<Rating>, AbstractGlobalError>> {
      try {
         const rating = await this.repository.findOneBy({ id: Number(id) });
         if (!rating) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         return {
            ok: true,
            value: rating,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async create(
      entity: Partial<Rating>,
   ): Promise<Result<Partial<Rating>, AbstractGlobalError>> {
      try {
         let rating = this.repository.create(entity);
         rating = await this.repository.save(rating);

         if (!rating) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating rating"),
            };
         }
         return {
            ok: true,
            value: rating,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Partial<Rating>>,
   ): Promise<Result<Partial<Rating>, AbstractGlobalError>> {
      try {
         const updatedRatings = await this.repository.update(
            Number(id),
            entity,
         );
         if (!updatedRatings.affected) {
            return {
               ok: false,
               error: new RepositoryError(404, "Error updating rating"),
            };
         }
         const rating = await this.repository.findOneBy({ id: Number(id) });
         return {
            ok: true,
            value: rating!,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const rating = await this.repository.findOneBy({ id: Number(id) });
         if (!rating) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         const _deletedCategory = await this.repository.delete(Number(id));
         return {
            ok: true,
            value: void 0,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching rating", error),
         };
      }
   }
}

export default RatingRepository;
