import { PrismaClient, Category, Prisma } from "@prisma/client";

export class CategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async getAllCategories(
    where?: Prisma.CategoryWhereInput
  ): Promise<Category[]> {
    return this.prisma.category.findMany({ where });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async updateCategory(
    id: number,
    data: Prisma.CategoryUpdateInput
  ): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: { ...data } });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
