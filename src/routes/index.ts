import { Request, Response, Router } from "express";
import errorMiddleware from "../middleware/errorMiddleware";
import authRouter from "./auth.routes";
import PrezentationRouter from "./prezentations.routes";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/prezentations", PrezentationRouter);

export default mainRouter;
