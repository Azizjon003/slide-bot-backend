import { NextFunction, Request, Response } from "express";
import { checkTokenBot, generateToken } from "../service/jwt.service";
import prisma from "../../prisma/prisma";
import { CustomError } from "../utils/customError";
import { Validations } from "../validations/like.validations";

export const LikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, id } = await Validations.createLikeValidation(req.query);
    const userId = req.session?.user?.id;

    const like = await prisma.likes.upsert({
      where: {
        user_id_chat_id: {
          chat_id: id,
          user_id: userId,
        },
      },
      update: {
        like: q,
      },
      create: {
        user_id: userId,
        chat_id: id,
        like: q,
      },
    });

    return res.json({
      message: "success",
      like,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
