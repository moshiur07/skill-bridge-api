import { Request, Response } from "express";
import { adminService } from "./admin.service.js";

const getAdminDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getAdminDashboardStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUsersByAdmin = async (req: Request, res: Response) => {
  // filter users by role if role query param is provided
  const { role } = req?.query;
  try {
    const users = await adminService.getUsersByAdmin(
      role as string | undefined,
    );
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await adminService.getAllBookings();
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await adminService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const category = await adminService.createCategory(name, description);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const category = await adminService.deleteCategory(Number(categoryId));
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const adminController = {
  getAdminDashboardStats,
  getUsersByAdmin,
  getAllBookings,
  getAllCategories,
  createCategory,
  deleteCategory,
};
