import { Router } from "express";
import { tutorController } from "./tutor.controller";
import authGuard from "../../middleware/authGuard";

const router = Router();

router.post("/", authGuard("student"), tutorController.createTutor);
router.get("/", authGuard("tutor"));

export const tutorRouter = router;
