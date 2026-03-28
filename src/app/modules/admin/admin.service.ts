import status from "http-status";
import AppError from "../../../helper/AppError.js";
import { prisma } from "../../lib/prisma.js";

const getAdminDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalTutors = await prisma.tutorProfile.count();
  const totalBookings = await prisma.booking.count();
  const totalReviews = await prisma.review.count();
  const totalRevenue = await prisma.booking.aggregate({
    _sum: {
      total_price: true,
    },
  });
  return {
    totalUsers,
    totalTutors,
    totalBookings,
    totalReviews,
    totalRevenue: totalRevenue._sum.total_price || 0,
  };
};

const getUsersByAdmin = async (role?: string) => {
  const whereCondition: any = {};

  // Only apply the filter if role exists and it's NOT 'all'
  if (role && role.toLowerCase() !== "all") {
    // Handling your "empty string" logic
    if (role.trim() === "") {
      whereCondition.role = null;
    } else {
      whereCondition.role = role;
    }
  }

  const users = await prisma.user.findMany({
    where: whereCondition, // If role was 'all', this is just {} (returns everyone)
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isBanned: true,
      createdAt: true,
      tutor_profile: {
        select: { isFeatured: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    users,
    count: users.length, // No need to 'await' a .length property!
  };
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
    throw new AppError(
      status.BAD_REQUEST,
      "Category with this name already exists",
    );
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
    throw new AppError(status.NOT_FOUND, "Category not found");
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
