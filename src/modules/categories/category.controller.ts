import { Request, Response } from "express";
import { categoryService } from "./category.service.js";

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
export const categoryController = {
  addCategory,
};
