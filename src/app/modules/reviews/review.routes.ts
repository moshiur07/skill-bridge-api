import { Router } from "express";
import { reviewsController } from "./review.controller.js";
import authGuard from "../../middleware/authGuard.js";

const router = Router();

router.post("/", authGuard("student"), reviewsController.createReview);

export const reviewsRouter = router;
