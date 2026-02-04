import { prisma } from "../../lib/prisma";

const addCategory = async (data: { name: string; description: string }) => {
  return await prisma.category.create({ data });
};

export const categoryService = {
  addCategory,
};
