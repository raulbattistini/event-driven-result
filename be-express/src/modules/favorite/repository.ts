import { DataSource, DeepPartial, Repository } from "typeorm";
import IFavoriteRepository from "./interfaces/repository.interface";
import Favorite from "./entity";
import { z, ZodNumber, ZodString } from "zod";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";
import { Result } from "../../shared/utils/helpers/result.util";
import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class FavoriteRepository implements IFavoriteRepository {
   private repository: Repository<Favorite>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(Favorite);
   }
   async getByRecipeId(
      id: ZodNumber,
   ): Promise<Result<DeepPartial<Favorite>, AbstractGlobalError>> {
      try {
         const favorite = await this.repository.findOneBy({
            recipeId: Number(id),
         });
         if (!favorite) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorite not found"),
            };
         }
         return {
            ok: true,
            value: favorite,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async getReported(): Promise<
      Result<DeepPartial<Favorite>[], AbstractGlobalError>
   > {
      try {
         const favorites = await this.repository.findBy({ isReported: true });
         if (!favorites || favorites.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorites not found"),
            };
         }
         return {
            ok: true,
            value: favorites,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async getDeleted(): Promise<
      Result<DeepPartial<Favorite>[], AbstractGlobalError>
   > {
      try {
         const favorites = await this.repository.findBy({ isDeleted: true });
         if (!favorites || favorites.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorites not found"),
            };
         }
         return {
            ok: true,
            value: favorites,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async getAll(): Promise<
      Result<DeepPartial<Favorite>[], AbstractGlobalError>
   > {
      try {
         const favorites = await this.repository.find();
         if (!favorites || favorites.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorites not found"),
            };
         }
         return {
            ok: true,
            value: favorites,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<DeepPartial<Favorite>, AbstractGlobalError>> {
      try {
         const favorite = await this.repository.findOneBy({ id: Number(id) });
         if (!favorite) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorite not found"),
            };
         }
         return {
            ok: true,
            value: favorite,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async create(
      entity: DeepPartial<Favorite>,
   ): Promise<Result<DeepPartial<Favorite>, AbstractGlobalError>> {
      try {
         let favorite = await this.repository.findOneBy({
            id: Number(entity.id),
         });
         if (favorite) {
            return {
               ok: false,
               error: new RepositoryError(400, "Favorite already exists"),
            };
         }
         let newFavorite = this.repository.create(entity);
         newFavorite = await this.repository.save(entity);
         return {
            ok: true,
            value: newFavorite,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<DeepPartial<Favorite>>,
   ): Promise<Result<DeepPartial<Favorite>, AbstractGlobalError>> {
      try {
         let favorite = await this.repository.findOneBy({ id: Number(id) });
         if (!favorite) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorite not found"),
            };
         }
         const updatedFavorite = await this.repository.save({
            ...favorite,
            ...entity,
         });
         if (!updatedFavorite) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating favorite"),
            };
         }
         return {
            ok: true,
            value: updatedFavorite,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async deactivate(
      id: z.ZodNumber,
   ): Promise<Result<Partial<Favorite>, AbstractGlobalError>> {
      try {
         const favorite = await this.repository.findOneBy({ id: Number(id) });
         if (!favorite) {
            return {
               ok: false,
               error: new RepositoryError(404, "Favorite not found"),
            };
         }
         const updatedFavorite = await this.repository.save({
            ...favorite,
            isDeleted: true,
         });
         if (!updatedFavorite) {
            return {
               ok: false,
               error: new RepositoryError(500, "Error creating favorite"),
            };
         }
         return {
            ok: true,
            value: updatedFavorite,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error creating favorite", error),
         };
      }
   }
}

export default FavoriteRepository;
