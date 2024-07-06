import { Router } from "express";
import { getAuthToken, getMe, logout } from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import { LikePost } from "../controllers/like.controller";

const likeRouter = Router();

likeRouter.use(AuthMiddleware);
likeRouter.get("/like", LikePost);
export default likeRouter;
