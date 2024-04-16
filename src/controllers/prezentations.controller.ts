import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

import { CustomError } from "../utils/customError";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prezentations = await prisma.chat.findMany();
    res.json(prezentations);
  } catch (error) {
    next(error);
  }
};
