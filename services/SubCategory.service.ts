import { PrismaClient, SubCategory, Prisma } from "@prisma/client";

export class SubCategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createSubCategory(
    // data: Prisma.SubCategoryCreateInput
    data: any
  ): Promise<SubCategory> {
    return this.prisma.subCategory.create({
      data: {
        ...data,
        category: { connect: { id: data.category } },
      },
    });
  }

  async getAllSubCategories(): Promise<SubCategory[]> {
    return this.prisma.subCategory.findMany({});
  }

  async getSubCategoriesByCategory(categoryId: number): Promise<SubCategory[]> {
    return this.prisma.subCategory.findMany({
      where: { categoryId },
    });
  }

  async getSubCategoryById(id: number): Promise<SubCategory | null> {
    return this.prisma.subCategory.findUnique({ where: { id } });
  }

  async updateSubCategory(
    id: number,
    data: Prisma.SubCategoryUpdateInput
  ): Promise<SubCategory> {
    return this.prisma.subCategory.update({ where: { id }, data });
  }

  async deleteSubCategory(id: number): Promise<SubCategory> {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
