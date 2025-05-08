import { z } from "zod";
import { DeepPartial } from "typeorm";
import { Result } from "../../../shared/utils/helpers/result.util";
import IAbstractRepository from "../../../shared/abstract/repository/interface";
import FavoriteSchema from "../schema";
import Favorite from "../entity";

import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";

type FavoriteID = typeof FavoriteSchema.shape.id;
interface IFavoriteRepository
   extends IAbstractRepository<Favorite, DeepPartial<Favorite>, FavoriteID> {
   getDeleted(): Promise<Result<DeepPartial<Favorite>[], AbstractGlobalError>>;
   getReported(): Promise<Result<DeepPartial<Favorite>[], AbstractGlobalError>>;
   getByRecipeId(
      id: z.ZodNumber,
   ): Promise<Result<DeepPartial<Favorite>, AbstractGlobalError>>;
   deactivate(
      id: z.ZodNumber,
   ): Promise<Result<Partial<Favorite>, AbstractGlobalError>>;
}

export default IFavoriteRepository;
