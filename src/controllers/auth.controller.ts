import { NextFunction, Request, Response } from "express";
import { checkTokenBot, generateToken } from "../service/jwt.service";
import prisma from "../../prisma/prisma";
import { CustomError } from "../utils/customError";

export const getAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.query?.token;
    if (!token) {
      throw new Error("Token is required");
    }

    const session = await checkTokenBot(token);

    if (!session) {
      throw new CustomError("Invalid or expired token", 401);
    }

    console.log(session);
    const user = await prisma.session.findFirst({
      where: {
        id: session.session_id,
      },
      include: {
        user: {
          include: {
            user: {
              include: {
                wallet: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const generateTokens = generateToken({
      session_id: user.id,
    });

    const userData = {
      name: user.user.name,
      email: user.user.email,
      id: user.user.id,
      created_at: user.user.created_at,
      balance: user.user?.user.wallet?.balance,
    };
    res.cookie("token", generateTokens, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({
      message: "User profile fetched successfully",
      data: userData,
      accessToken: generateTokens,
    });
  } catch (error) {
    next(error);
  }
};
