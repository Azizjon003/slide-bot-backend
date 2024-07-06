import { Request, Response, Router } from "express";
import errorMiddleware from "../middleware/errorMiddleware";
import authRouter from "./auth.routes";
import PrezentationRouter from "./prezentations.routes";
import ImageRouter from "./image.routes";
import likeRouter from "./like.routes";
import reviewsRouter from "./review.routes";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/prezentations", PrezentationRouter);
mainRouter.use("/images", ImageRouter);
mainRouter.use("/like", likeRouter);
mainRouter.use("/reviews", reviewsRouter);

export default mainRouter;
