import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import { getAll, getOne } from "../controllers/prezentations.controller";

const PrezentationRouter = Router();

PrezentationRouter.use(AuthMiddleware);
PrezentationRouter.get("/search", getAll);
PrezentationRouter.get("/:id", getOne);

export default PrezentationRouter;
