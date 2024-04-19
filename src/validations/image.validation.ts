import Joi from "joi";
import { CustomError } from "../utils/customError";

export class Validations {
  static async queryValidations(data: any) {
    return await Joi.string().required().validateAsync(data);
  }
}
