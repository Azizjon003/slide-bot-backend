import Joi from "joi";
import { CustomError } from "../utils/customError";

export class Validations {
  static async queryValidations(data: any) {
    return await Joi.string().required().validateAsync(data);
  }
  static async queryImageSearchValidations(data: any) {
    return await Joi.object({
      q: Joi.string().required(),
      type: Joi.string().valid("un", "bing").default("bing"),
    }).validateAsync(data);
  }
}
