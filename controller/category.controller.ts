import { Request, Response } from "express";
import { CategoryService } from "../services/Category.service";
import { BaseController } from "./_Base.controller";

export class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, taxApplicability, taxType, subCategories } =
        req.body;
      const image = req.file;
      // console.log("image", image);
      const data = {
        name,
        description,
        image: image ? image.path : "",
        taxApplicability: Boolean(taxApplicability),
        taxType,
        subCategories,
      };
      const category = await this.categoryService.createCategory(data);
      this._sendResponse(res, "Category created", 201, { category });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      this._sendResponse(res, "All categories", 200, { categories });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryService.getCategoryById(
        Number(req.params.id)
      );
      if (category) {
        this._sendResponse(res, "Category found", 200, { category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      this._sendError(res, error);
    }
  };

  updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, taxApplicability, taxType, subCategories } =
        req.body;
      const image = req.file;
      // console.log("image", image);
      const data = {
        name,
        description,
        image: image?.path,
        taxApplicability: Boolean(taxApplicability),
        taxType,
        subCategories,
      };
      const category = await this.categoryService.updateCategory(
        Number(req.params.id),
        data
      );
      this._sendResponse(res, "Category Updated", 200, { category });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.categoryService.deleteCategory(Number(req.params.id));
      this._sendResponse(res, "Category deleted", 200);
    } catch (error) {
      this._sendError(res, error);
    }
  };
}
