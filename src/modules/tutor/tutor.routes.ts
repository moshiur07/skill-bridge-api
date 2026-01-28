import { Router } from "express";
import { tutorController } from "./tutor.controller";
import authGuard from "../../middleware/authGuard";
import { auth } from "../../lib/auth";

const router = Router();

router.post("/", authGuard("student"), tutorController.createTutor);
router.get("/", tutorController.getTutors);
router.delete("/:tutorId", authGuard("admin"), tutorController.deleteTutor);
export const tutorRouter = router;
