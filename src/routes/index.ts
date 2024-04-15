import { Request, Response, Router } from "express";
import errorMiddleware from "../middleware/errorMiddleware";
import authRouter from "./auth.routes";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;
