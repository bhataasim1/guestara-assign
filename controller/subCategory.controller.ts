import { Request, Response } from "express";
import { SubCategoryService } from "../services/SubCategory.service";
import { BaseController } from "./_Base.controller";

export class SubCategoryController extends BaseController {
  private subCategoryService: SubCategoryService;

  constructor() {
    super();
    this.subCategoryService = new SubCategoryService();
  }

  createSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = Number(req.params.categoryId);
      const { name, description, taxApplicability, taxType } = req.body;
      const image = req.file;
      const data = {
        name,
        description,
        image: image?.path,
        taxApplicability: Boolean(taxApplicability),
        taxType,
        category: categoryId,
      };
      const subCategory = await this.subCategoryService.createSubCategory({
        ...data,
      });
      this._sendResponse(res, "SubCategory created", 201, { subCategory });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const subCategories = await this.subCategoryService.getAllSubCategories();
      this._sendResponse(res, "All subCategories", 200, { subCategories });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getSubCategoriesByCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const subCategories =
        await this.subCategoryService.getSubCategoriesByCategory(
          Number(req.params.categoryId)
        );
      this._sendResponse(res, "All subCategories by Category", 200, {
        subCategories,
      });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const subCategory = await this.subCategoryService.getSubCategoryById(
        Number(req.params.id)
      );
      if (!subCategory) {
        this._sendResponse(res, "SubCategory not found", 404);
      }

      this._sendResponse(res, "SubCategory found", 200, { subCategory });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  updateSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, taxApplicability, taxType } = req.body;
      const image = req.file;
      const data = {
        name,
        description,
        image: image?.path,
        taxApplicability: Boolean(taxApplicability),
        taxType,
      };
      const subCategory = await this.subCategoryService.updateSubCategory(
        Number(req.params.id),
        data
      );
      this._sendResponse(res, "SubCategory updated", 200, { subCategory });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.subCategoryService.deleteSubCategory(Number(req.params.id));
      this._sendResponse(res, "SubCategory deleted", 204);
    } catch (error) {
      this._sendError(res, error);
    }
  };
}
