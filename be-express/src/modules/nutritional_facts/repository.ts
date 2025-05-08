import { DataSource, Repository } from "typeorm";
import { ZodNumber } from "zod";
import { Result } from "../../shared/utils/helpers/result.util";
import { BaseNutritionalFactsDto } from "../../shared/dtos/nutritional_facts_get.dto";
import INutritionalFactsRepository from "./interfaces/repository.interface";
import NutritionalFacts from "./entity";
import AbstractGlobalError from "../../shared/utils/helpers/errors/global.error";

import RepositoryError from "../../shared/utils/helpers/errors/classes/repository.error";

class NutritionalFactsRepository implements INutritionalFactsRepository {
   private repository: Repository<NutritionalFacts>;
   constructor(private readonly connection: DataSource) {
      this.repository = this.connection.getRepository(NutritionalFacts);
   }
   async getMacro(
      id: string,
   ): Promise<Result<BaseNutritionalFactsDto, AbstractGlobalError>> {
      try {
         const allNutritionalFacts = await this.repository.findOneBy({
            id: Number(id),
         });
         if (!allNutritionalFacts) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         const result: BaseNutritionalFactsDto = {
            id: allNutritionalFacts.id,
            recipeId: allNutritionalFacts.recipeId,
            calories: allNutritionalFacts.calories,
            carbohydrates: allNutritionalFacts.carbohydrates,
            protein: allNutritionalFacts.protein,
            fat: allNutritionalFacts.fat,
         };
         return {
            ok: true,
            value: result,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getAll(): Promise<
      Result<Partial<NutritionalFacts>[], AbstractGlobalError>
   > {
      try {
         const nutritionalFacts = await this.repository.find();
         if (!nutritionalFacts || nutritionalFacts.length === 0) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         return {
            ok: true,
            value: nutritionalFacts,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async getById(
      id: ZodNumber,
   ): Promise<Result<Partial<NutritionalFacts>, AbstractGlobalError>> {
      try {
         const nutritionalFacts = await this.repository.findOneBy({
            id: Number(id),
         });
         if (!nutritionalFacts) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         return {
            ok: true,
            value: nutritionalFacts,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }

   async create(
      entity: Partial<NutritionalFacts>,
   ): Promise<Result<Partial<NutritionalFacts>, AbstractGlobalError>> {
      try {
         let nutritionalFacts = this.repository.create(entity);
         nutritionalFacts = await this.repository.save(entity);
         if (!nutritionalFacts) {
            return {
               ok: false,
               error: new RepositoryError(
                  404,
                  "Error creating nutritional facts",
               ),
            };
         }
         return {
            ok: true,
            value: nutritionalFacts,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async update(
      id: ZodNumber,
      entity: Partial<Partial<NutritionalFacts>>,
   ): Promise<Result<Partial<NutritionalFacts>, AbstractGlobalError>> {
      try {
         let nutritionalFacts = await this.repository.findOneBy({
            id: Number(id),
         });
         if (!nutritionalFacts) {
            return {
               ok: false,
               error: new RepositoryError(404, "No ratings found"),
            };
         }
         let updatedNutritional = await this.repository.update(
            { id: Number(id) },
            entity,
         );
         nutritionalFacts = await this.repository.findOneBy({
            id: Number(id),
         });

         if (!updatedNutritional.affected) {
            return {
               ok: false,
               error: new RepositoryError(
                  404,
                  "Error updating nutritional facts",
               ),
            };
         }
         return {
            ok: true,
            value: nutritionalFacts!,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
   async delete(id: ZodNumber): Promise<Result<void, AbstractGlobalError>> {
      try {
         const nutritionalFacts = await this.repository.findOneBy({
            id: Number(id),
         });
         if (!nutritionalFacts) {
            return {
               ok: false,
               error: new RepositoryError(404, "No nutritional facts found"),
            };
         }
         const deletedNutritional = await this.repository.delete({
            id: Number(id),
         });
         if (!deletedNutritional.affected) {
            return {
               ok: false,
               error: new RepositoryError(
                  404,
                  "Error deleting nutritional facts",
               ),
            };
         }
         return {
            ok: true,
            value: void 0,
         };
      } catch (error) {
         return {
            ok: false,
            error: new RepositoryError(500, "Error fetching user", error),
         };
      }
   }
}

export default NutritionalFactsRepository;
