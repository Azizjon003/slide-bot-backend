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

    if (search === "new") {
      const prezentationsCount = await prisma.chat.count({
        orderBy: {
          created_at: "desc",
        },
      });

      const pagenation = getPagenation(page, limit, prezentationsCount);

      const prezentations = await prisma.chat.findMany({
        ...(await pagenation).db,
        orderBy: {
          created_at: "desc",
        },
      });

      let data = prezentations.map((item) => {
        return prezenationRenderItems(item);
      });

      return res.json({
        data: data,
        pagenation: (await pagenation).meta,
      });
    } else {
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

      return res.json({
        data: data,
        pagenation: (await pagenation).meta,
      });
    }
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

    console.log(id);
    const prezentationData = await prisma.chat.findFirst({
      where: {
        id,
      },
    });

    console.log(prezentationData);
    if (!prezentationData) {
      throw new CustomError("data not found", 404);
    }

    const plansAndDescription = await prisma.plan.findMany({
      where: {
        chat_id: id,
      },
      include: {
        description: true,
      },
    });

    if (plansAndDescription?.length === 0) {
      throw new CustomError("data not found", 404);
    }
    let renderPlans = plansAndDescription.map((item) => {
      return prezenationPlansRenderItems(item);
    });

    res.status(200).json({
      data: {
        id: prezentationData.id,
        name: prezentationData.name,
        pagesCount: prezentationData.pageCount,
        lang: prezentationData.lang,
        created_at: prezentationData.created_at,
        plans: renderPlans,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
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

const prezenationPlansRenderItems = (item: any) => {
  return {
    name: item.name?.split("&&")[0] || item.name,
    id: item.id,
    description: item.description.map((item: any) => {
      return {
        name: item.name,
        content: item.content,
      };
    }),
    created_at: item.createdAt,
  };
};
