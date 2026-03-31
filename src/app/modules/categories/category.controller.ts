import { Request, Response } from "express";
import { categoryService } from "./category.service.js";
import catchAsync from "../../../helper/controllerHandler.js";
import { sendResponse } from "../../../helper/sendResponse.js";
import status from "http-status";

const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryService.addCategory(req.body);
    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add category",
    });
  }
};

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  sendResponse(res, {
    httpStatus: status.OK,
    success: true,
    data: categories,
  });
});

export const categoryController = {
  addCategory,
  getCategories,
};
