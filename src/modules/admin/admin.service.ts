import { prisma } from "../../lib/prisma.js";

const getAdminDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalTutors = await prisma.tutorProfile.count();
  const totalBookings = await prisma.booking.count();
  const totalReviews = await prisma.review.count();

  return {
    totalUsers,
    totalTutors,
    totalBookings,
    totalReviews,
  };
};

const getUsersByAdmin = async (role?: string) => {
  const whereCondition: any = {};
  if (role) {
    whereCondition.role = role;
  }
  const users = await prisma.user.findMany({
    where: whereCondition,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isBanned: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const count = await users.length;

  return { users, count };
};

const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      tutor: {
        select: {
          id: true,
          image: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      student: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const createCategory = async (name: string, description: string) => {
  // Check if category with the same name already exists
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }
  return await prisma.category.create({
    data: {
      name,
      description,
    },
  });
};

const deleteCategory = async (categoryId: number) => {
  // Check if category exists
  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  return await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export const adminService = {
  getAdminDashboardStats,
  getUsersByAdmin,
  getAllBookings,
  getAllCategories,
  createCategory,
  deleteCategory,
};
