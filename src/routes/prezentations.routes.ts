import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import { getAll } from "../controllers/prezentations.controller";

const PrezentationRouter = Router();

PrezentationRouter.use(AuthMiddleware);
PrezentationRouter.get("/search", getAll);

export default PrezentationRouter;
