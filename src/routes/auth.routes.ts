import { Router } from "express";
import { getAuthToken } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/authorization", getAuthToken);
export default authRouter;
