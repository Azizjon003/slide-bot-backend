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
    let user = await prisma.session.findFirst({
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
    await prisma.session.delete({
      where: {
        id: session.session_id,
      },
    });

    user = await prisma.session.create({
      data: {
        user_id: user.user.id,
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

    const generateTokens = generateToken({
      session_id: user.id,
    });

    const userData = getUser(user);
    res.cookie("access-token", generateTokens, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.redirect("http://localhost:5173/");
    // res.status(200).json({
    //   message: "User profile fetched successfully",
    //   data: userData,
    //   accessToken: generateTokens,
    // });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = req.session;
    const userProfileData = getUser(session);

    res.status(200).json({
      message: "User profile fetched successfully",
      data: userProfileData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = req.session;
    if (!session) {
      throw new CustomError("Session not found", 404);
    }

    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });
    await res.cookie("access-token", "", {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    await res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUser = (user: any) => {
  return {
    name: user.user.name,
    email: user.user.email,
    id: user.user.id,
    created_at: user.user.created_at,
    balance: user.user?.user.wallet?.balance,
  };
};
