import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

import { CustomError } from "../utils/customError";
import { Validations } from "../validations/prezentation.validations";
import { getPagenation } from "../service/pagenation.service";

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

    res.json({
      data: prezentations,
      pagenation: (await pagenation).meta,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
