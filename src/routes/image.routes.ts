// router added
import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import {
  chatGetImagesById,
  getImagesApi,
} from "../controllers/imageSearch.controller";

const ImageRouter = Router();

ImageRouter.use(AuthMiddleware);

ImageRouter.get("/:id", chatGetImagesById);
ImageRouter.get("/search", getImagesApi);

export default ImageRouter;
