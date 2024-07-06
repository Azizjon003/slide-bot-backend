import { NextFunction, Request, Response } from "express";
import { checkTokenBot, generateToken } from "../service/jwt.service";
import prisma from "../../prisma/prisma";
import { CustomError } from "../utils/customError";
import { Validations } from "../validations/review.validations";
import { GeneralValidations } from "../validations/general.validation";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { review, id } = await Validations.createReviewValidation(req.body);
    const userId = req.session?.user?.user_id;

    const reviewData = await prisma.reviews.create({
      data: {
        user_id: userId,
        chat_id: id,
        review,
      },
    });

    return res.json({
      message: "success",
      reviewData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await GeneralValidations.idValidations(req.query.id);
    const reviews = await prisma.reviews.findMany({
      where: {
        chat_id: id,
      },
    });

    return res.json({
      reviews,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await GeneralValidations.idValidations(req.query.id);
    const userId = req.session?.user?.user_id;

    const review = await prisma.reviews.delete({
      where: {
        id: id,
        user_id: userId,
      },
    });

    return res.json({
      message: "success",
      review,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
