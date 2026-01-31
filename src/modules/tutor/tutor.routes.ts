import { Router } from "express";
import { tutorController } from "./tutor.controller";
import authGuard from "../../middleware/authGuard";
import { auth } from "../../lib/auth";

const router = Router();

router.post("/", authGuard("student"), tutorController.createTutor);
router.get("/", tutorController.getTutors);
router.get("/:tutorId", tutorController.getSingleTutor);
router.put(
  "/:tutorId/schedule",
  authGuard("tutor"),
  tutorController.updateSchedule,
);
router.put("/:tutorId", authGuard("tutor"), tutorController.updateTutor);

router.put(
  "/:tutorId/featured",
  authGuard("admin"),
  tutorController.updateFeatured,
);

router.delete("/:tutorId", authGuard("admin"), tutorController.deleteTutor);

export const tutorRouter = router;
