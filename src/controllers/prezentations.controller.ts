import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

import { CustomError } from "../utils/customError";
import { Validations } from "../validations/prezentation.validations";
import { getPagenation } from "../service/pagenation.service";
import { GeneralValidations } from "../validations/general.validation";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, search } = await Validations.createUserValidation(
      req.query
    );
    const prezentationsCount = await prisma.chat.count({
      where: {
        name: {
          contains: search,
        },
      },
    });

    const pagenation = getPagenation(page, limit, prezentationsCount);

    const prezentations = await prisma.chat.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      ...(await pagenation).db,
      orderBy: {
        created_at: "desc",
      },
    });

    let data = prezentations.map((item) => {
      return prezenationRenderItems(item);
    });
    res.json({
      data: data,
      pagenation: (await pagenation).meta,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await GeneralValidations.idValidations(req.params.id);
  } catch (error) {
    console.log(error);
  }
};

const prezenationRenderItems = (item: any) => {
  return {
    id: item.id,
    name: item.name,
    pagesCount: item.pageCount,
    lang: item.lang,
    created_at: item.created_at,
  };
};
