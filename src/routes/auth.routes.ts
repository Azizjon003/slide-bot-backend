import { Router } from "express";
import { getAuthToken, getMe, logout } from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.get("/authorization", getAuthToken);
authRouter.use(AuthMiddleware);
authRouter.get("/me", getMe);
authRouter.get("/logout", logout);
export default authRouter;
