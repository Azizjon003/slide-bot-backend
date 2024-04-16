import Joi from "joi";
import { CustomError } from "../utils/customError";

export class GeneralValidations {
  static async idValidations(data: any) {
    return await Joi.string()
      .valid(
        /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-(8|9|a|b)[0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/
      )
      .required()
      .validateAsync(data);
  }
}
