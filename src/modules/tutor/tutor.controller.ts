import { Request, Response } from "express";
import { tutorServices } from "./tutor.service";

const createTutor = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  try {
    const result = await tutorServices.createTutor(req.body, user_id!);
    console.log(result);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

export const tutorController = {
  createTutor,
};
