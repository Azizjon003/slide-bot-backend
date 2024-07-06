import Joi from "joi";

export class Validations {
  static async createLikeValidation(data: any) {
    return await Joi.object({
      q: Joi.string().valid("like", "dislike").required(),
      id: Joi.string().required(),
    }).validateAsync(data);
  }
}
