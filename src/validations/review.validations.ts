import Joi from "joi";

export class Validations {
  static async createReviewValidation(data: any) {
    return await Joi.object({
      review: Joi.string().required(),
      id: Joi.string().required(),
    }).validateAsync(data);
  }
}
