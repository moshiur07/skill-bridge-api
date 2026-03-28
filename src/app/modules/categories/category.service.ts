import { prisma } from "../../lib/prisma.js";

const addCategory = async (data: { name: string; description: string }) => {
  return await prisma.category.create({ data });
};

export const categoryService = {
  addCategory,
};
