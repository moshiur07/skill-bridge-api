import { Router } from "express";
import { tutorController } from "./tutor.controller.js";
import authGuard from "../../middleware/authGuard.js";
// import { validateRequest } from "../../../helper/validateSchema.js";
import {
  createTutorZodSchema,
  updateTutorZodSchema,
} from "./tutor.validation.js";
import { multerUpload } from "../../../config/multer.config.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  authGuard("student", "tutor"),
  multerUpload.single("image"),
  validateRequest(createTutorZodSchema),
  tutorController.createTutor,
);

router.get("/", tutorController.getTutors);
router.get("/:tutorId", tutorController.getSingleTutor);

router.put(
  "/:tutorId/schedule",
  authGuard("tutor"),
  tutorController.updateSchedule,
);
router.put(
  "/:tutorId",
  authGuard("tutor"),
  multerUpload.single("image"),
  validateRequest(updateTutorZodSchema),
  tutorController.updateTutor,
);

router.get("/:tutorId/availability", tutorController.getAvailability);

router.post(
  "/:tutorId/availability",
  authGuard("tutor"),
  tutorController.setAvailability,
);

router.delete(
  "/availability/:availabilityId",
  authGuard("tutor"),
  tutorController.deleteAvailability,
);

router.put(
  "/:tutorId/featured",
  authGuard("admin"),
  tutorController.updateFeatured,
);

router.delete("/:tutorId", authGuard("admin"), tutorController.deleteTutor);

export const tutorRouter = router;
