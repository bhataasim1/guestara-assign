import express from "express";
import { ItemController } from "../controller/Item.controller";
import { upload } from "../middleware/fileUpload.middleware";

const itemRouter = express.Router();
const itemController = new ItemController();

itemRouter.post(
  "/:subcategoryId/item",
  upload.single("image"),
  itemController.createItem
);
itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/category/:categoryId", itemController.getItemsByCategory);
itemRouter.get(
  "/subcategory/:subcategoryId",
  itemController.getItemsBySubCategory
);
itemRouter.get("/:id", itemController.getItemById);
itemRouter.put("/:id", upload.single("image"), itemController.updateItem);
itemRouter.delete("/:id", itemController.deleteItem);
itemRouter.get("/search/item", itemController.searchItems);

export default itemRouter;
