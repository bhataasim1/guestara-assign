import { Request, Response } from "express";
import { ItemService } from "../services/Item.service";
import { BaseController } from "./_Base.controller";
import { Prisma } from "@prisma/client";

export class ItemController extends BaseController {
  private itemService: ItemService;

  constructor() {
    super();
    this.itemService = new ItemService();
  }

  createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        name,
        description,
        taxApplicability,
        tax,
        baseAmount,
        discount,
        totalAmount,
      } = req.body;
      const image = req.file;
      const data = {
        name,
        description,
        image: image?.path,
        taxApplicability: Boolean(taxApplicability),
        tax: parseFloat(tax),
        baseAmount: Number(baseAmount),
        discount: Number(discount),
        totalAmount: Number(totalAmount),
        subCategory: Number(req.params.subcategoryId),
      };
      const item = await this.itemService.createItem({
        ...data,
      });
      this._sendResponse(res, "Item created", 201, { item });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.getAllItems();
      this._sendResponse(res, "All items", 200, { items });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getItemsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.getItemsByCategory(
        Number(req.params.categoryId)
      );
      this._sendResponse(res, "All items by Category", 200, { items });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getItemsBySubCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const items = await this.itemService.getItemsBySubCategory(
        Number(req.params.subcategoryId)
      );
      this._sendResponse(res, "All items by SubCategory", 200, { items });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.itemService.getItemById(Number(req.params.id));
      if (!item) {
        this._sendResponse(res, "Item not found", 404);
      }
      this._sendResponse(res, "Item found", 200, { item });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  updateItem = async (req: Request, res: Response): Promise<void> => {
    const {
      name,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
    } = req.body;
    const image = req.file;
    // console.log(image);

    const data: Prisma.ItemUpdateInput = {
      name,
      description,
      image: image?.path,
      taxApplicability:
        taxApplicability !== undefined ? Boolean(taxApplicability) : undefined,
      tax: tax !== undefined ? parseFloat(tax) : undefined,
      baseAmount: baseAmount !== undefined ? Number(baseAmount) : undefined,
      discount: discount !== undefined ? Number(discount) : undefined,
      totalAmount: totalAmount !== undefined ? Number(totalAmount) : undefined,
    };

    Object.keys(data).forEach((key) => {
      if (data[key as keyof Prisma.ItemUpdateInput] === undefined) {
        delete data[key as keyof Prisma.ItemUpdateInput];
      }
    });

    try {
      const item = await this.itemService.updateItem(
        Number(req.params.id),
        data
      );
      this._sendResponse(res, "Item updated", 200, { item });
    } catch (error) {
      this._sendError(res, error);
    }
  };

  deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.itemService.deleteItem(Number(req.params.id));
      this._sendResponse(res, "Item deleted", 204);
    } catch (error) {
      this._sendError(res, error);
    }
  };

  searchItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const searchTerm = req.query.name as string;
      const items = await this.itemService.searchItems(searchTerm);
      this._sendResponse(res, "Items found", 200, { items });
    } catch (error) {
      this._sendError(res, error);
    }
  };
}
