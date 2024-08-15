import express from "express";
import { CategoryController } from "../controller/category.controller";
import { upload } from "../middleware/fileUpload.middleware";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.post(
  "/",
  upload.single("image"),
  categoryController.createCategory
);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.put(
  "/:id",
  upload.single("image"),
  categoryController.updateCategory
);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
