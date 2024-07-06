import { Router } from "express";
import { getAuthToken, getMe, logout } from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import { createReview, getReview } from "../controllers/review.controller";

const reviewsRouter = Router();

reviewsRouter.use(AuthMiddleware);
reviewsRouter.post("/create", createReview);
reviewsRouter.get("/get", getReview);
reviewsRouter.delete("/delete", getReview);
export default reviewsRouter;
