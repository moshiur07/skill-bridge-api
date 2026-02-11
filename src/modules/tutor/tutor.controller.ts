import { tutorServices } from "./tutor.service.js";
import { Request, Response } from "express";

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

const getTutors = async (req: Request, res: Response) => {
  const { search } = req.query;

  const category = Number(req.query.category) || undefined;

  const rating = Number(req.query.rating) || undefined;

  const price = Number(req.query.price) || undefined;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  try {
    const tutors = await tutorServices.getTutors({
      search: search as string | undefined,
      category,
      rating,
      price,
      limit,
      skip,
    });
    res.status(200).json({
      success: true,
      data: tutors,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

const getSingleTutor = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId;
  try {
    const tutor = await tutorServices.getSingleTutor(tutorId as string);
    res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

// ! update schedule service
const updateSchedule = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId;
  const scheduleData = req.body;
  try {
    const updatedSchedule = await tutorServices.updateSchedule(
      tutorId as string,
      scheduleData,
    );
    res.status(200).json({
      success: true,
      data: updatedSchedule,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};
const updateTutor = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId;
  const updateData = req.body;
  try {
    const updateTutorData = await tutorServices.updateTutor(
      tutorId as string,
      updateData,
    );
    res.status(200).json({
      success: true,
      data: updateTutorData,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

const updateFeatured = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId;
  const { featured }: { featured: boolean } = req.body;

  try {
    const updatedTutor = await tutorServices.updateFeatured(
      tutorId as string,
      featured,
    );
    res.status(200).json({
      success: true,
      data: updatedTutor,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

const deleteTutor = async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId;
  try {
    const deletedTutor = await tutorServices.deleteTutor(tutorId as string);
    res.status(200).json({
      success: true,
      data: deletedTutor,
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
  getTutors,
  deleteTutor,
  getSingleTutor,
  updateSchedule,
  updateTutor,
  updateFeatured,
};
