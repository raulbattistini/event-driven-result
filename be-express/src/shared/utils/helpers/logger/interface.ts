import { ERRORS_LEVELS_ENUM } from "../../enums/errors_levels.enum";

interface IWinstonInterface {
  handle: (
    obj: object,
    level: ERRORS_LEVELS_ENUM,
    message: string,
    ...args: any[]
  ) => void;
}

export default IWinstonInterface;
