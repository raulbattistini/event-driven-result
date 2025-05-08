import IAbstractRepository from "../../../shared/abstract/repository/interface";
import { BaseNutritionalFactsDto } from "../../../shared/dtos/nutritional_facts_get.dto";
import AbstractGlobalError from "../../../shared/utils/helpers/errors/global.error";
import { Result } from "../../../shared/utils/helpers/result.util";
import NutritionalFacts from "../entity";
import NutritionalFactsSchema from "../schema";

type NFID = typeof NutritionalFactsSchema.shape.id;
interface INutritionalFactsRepository
   extends IAbstractRepository<
      NutritionalFacts,
      Partial<NutritionalFacts>,
      NFID
   > {
   getMacro(
      id: string,
   ): Promise<Result<BaseNutritionalFactsDto, AbstractGlobalError>>;
}

export default INutritionalFactsRepository;
