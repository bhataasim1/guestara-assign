import express from "express";
import { SubCategoryController } from "../controller/subCategory.controller";
import { upload } from "../middleware/fileUpload.middleware";

const subCategoryRouter = express.Router();
const subCategoryController = new SubCategoryController();

subCategoryRouter.post(
  "/:categoryId/subcategory",
  upload.single("image"),
  subCategoryController.createSubCategory
);
subCategoryRouter.get("/", subCategoryController.getAllSubCategories);
subCategoryRouter.get(
  "/:categoryId/subcategories",
  subCategoryController.getSubCategoriesByCategory
);
subCategoryRouter.get("/:id", subCategoryController.getSubCategoryById);
subCategoryRouter.put(
  "/:id",
  upload.single("image"),
  subCategoryController.updateSubCategory
);
subCategoryRouter.delete("/:id", subCategoryController.deleteSubCategory);

export default subCategoryRouter;
