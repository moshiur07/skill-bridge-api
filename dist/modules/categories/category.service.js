import { prisma } from "../../lib/prisma";
const addCategory = async (data) => {
    return await prisma.category.create({ data });
};
export const categoryService = {
    addCategory,
};
//# sourceMappingURL=category.service.js.map