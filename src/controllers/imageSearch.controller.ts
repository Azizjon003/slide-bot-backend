import { NextFunction, Request, Response } from "express";
import { checkTokenBot, generateToken } from "../service/jwt.service";
import prisma from "../../prisma/prisma";
import { CustomError } from "../utils/customError";
import { getImages, searchImages } from "../service/searchImage.service";
import { Validations } from "../validations/image.validation";

export const getImagesApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = await Validations.queryValidations(req?.query?.q);
    const searches = await getImages(query);

    res.status(200).json({
      message: "Images fetched successfully",
      data: searches,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
