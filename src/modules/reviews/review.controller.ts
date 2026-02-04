import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, bookingId } = req.body;
    const newReview = await reviewService.createReview(
      rating,
      comment,
      bookingId,
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
  }
};

export const reviewsController = {
  createReview,
};
