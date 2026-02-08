import { Router } from "express";
import { reviewsController } from "./review.controller";
import authGuard from "../../middleware/authGuard";
const router = Router();
router.post("/", authGuard("student"), reviewsController.createReview);
export const reviewsRouter = router;
//# sourceMappingURL=review.routes.js.map