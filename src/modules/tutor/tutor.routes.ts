import { Router } from "express";
import { tutorController } from "./tutor.controller";

const router = Router();

router.post("/", tutorController.createTutor);

export const tutorRouter = router;
