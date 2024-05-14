// router added
import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import {
  chatGetImagesById,
  getImagesApi,
  getImagesNewSearchApi,
} from "../controllers/imageSearch.controller";

const ImageRouter = Router();
ImageRouter.get("/new-search", getImagesNewSearchApi);
ImageRouter.use(AuthMiddleware);
ImageRouter.get("/:id", chatGetImagesById);
ImageRouter.get("/search", getImagesApi);

export default ImageRouter;
