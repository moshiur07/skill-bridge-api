import { userService } from "./users.service.js";
import { Request, Response } from "express";
const handleBan = async (req: Request, res: Response) => {
  const user_id = req?.params?.id;
  try {
    const result = await userService.handleBan(user_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const user_id = req?.params?.id;
  try {
    const result = await userService.getUserById(user_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getTutorIdByUserId = async (req: Request, res: Response) => {
  const user_id = req?.params?.userId;
  try {
    const result = await userService.getTutorIdByUserId(user_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const user_id = req?.params?.id;
  const data = req.body;
  try {
    const result = await userService.updateUserData(user_id as string, data);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const user_id = req?.params?.id;
  try {
    const result = await userService.deleteUser(user_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
export const usersController = {
  handleBan,
  getUserById,
  getUsers,
  updateUserData,
  deleteUser,
  getTutorIdByUserId,
};
