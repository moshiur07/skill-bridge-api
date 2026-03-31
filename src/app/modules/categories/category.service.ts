import { prisma } from "../../lib/prisma.js";

const addCategory = async (data: { name: string; description: string }) => {
  return await prisma.category.create({ data });
};

const getCategories = async () => {
  return await prisma.category.findMany();
};
export const categoryService = {
  addCategory,
  getCategories,
};
