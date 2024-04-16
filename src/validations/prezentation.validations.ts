import Joi from "joi";
import { CustomError } from "../utils/customError";

export class Validations {
  static async createUserValidation(data: any) {
    return await Joi.object({
      search: Joi.string().required(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(25),
    }).validateAsync(data);
  }
}
