import { Request, Response } from "express";
import { reviewService } from "./review.service.js";

const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, booking_id } = req.body;
    const newReview = await reviewService.createReview(
      rating,
      comment,
      booking_id,
    );
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create review",
    });
    console.log(error);
  }
};

export const reviewsController = {
  createReview,
};
