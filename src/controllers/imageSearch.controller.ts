import { NextFunction, Request, Response } from "express";
import { checkTokenBot, generateToken } from "../service/jwt.service";
import prisma from "../../prisma/prisma";
import { CustomError } from "../utils/customError";
import {
  getImages,
  getImagesNewPixels,
  getImagesNewSearch,
  searchImages,
} from "../service/searchImage.service";
import { Validations } from "../validations/image.validation";
import { GeneralValidations } from "../validations/general.validation";
import { Bing } from "../service/searchImageBing";

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

export const chatGetImagesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await GeneralValidations.idValidations(req?.params?.id);

    const chat = await prisma.chat.findFirst({
      where: {
        id: id,
      },
      include: {
        plans: true,
      },
    });

    if (!chat) {
      throw new CustomError("Chat not found", 404);
    }

    const planNameInImageSearch = chat?.plans[0]?.name.split("&&")[1];

    const searchResult = await searchImages(planNameInImageSearch);

    res.status(200).json({
      message: "Images fetched successfully",
      data: {
        Name: planNameInImageSearch,
        image: searchResult,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getImagesNewSearchApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, type } = await Validations.queryImageSearchValidations(
      req?.query
    );

    if (type === "un") {
      const searches = await searchImages(q);
      return res.status(200).json({
        message: "Images fetched successfully",
        data: searches,
      });
    } else if (type === "bing") {
      const bing = new Bing(q, 10, "off", 10000, "photo");

      const imageUrls = await bing.run();

      return res.status(200).json({
        message: "Images fetched successfully",
        data: imageUrls,
      });
    }
    res.status(200).json({
      message: "Images fetched successfully",
      data: [],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
