import { PrismaClient, Item, Prisma } from "@prisma/client";

export class ItemService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createItem(data: any): Promise<Item> {
    return this.prisma.item.create({
      data: {
        ...data,
        subCategory: { connect: { id: data.subCategory } },
      },
    });
  }

  async getAllItems(): Promise<Item[]> {
    return this.prisma.item.findMany({});
  }

  async getItemsByCategory(categoryId: number): Promise<Item[]> {
    return this.prisma.item.findMany({
      where: {
        subCategory: {
          categoryId: categoryId,
        },
      },
      include: {
        subCategory: true,
      },
    });
  }

  async getItemsBySubCategory(id: number): Promise<Item[]> {
    return this.prisma.item.findMany({ where: { subCategoryId: id } });
  }

  async getItemById(id: number): Promise<Item | null> {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async updateItem(id: number, data: Prisma.ItemUpdateInput): Promise<Item> {
    return this.prisma.item.update({ where: { id }, data });
  }

  async deleteItem(id: number): Promise<Item> {
    return this.prisma.item.delete({ where: { id } });
  }

  async searchItems(searchTerm: string): Promise<Item[]> {
    return this.prisma.item.findMany({
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });
  }
}
