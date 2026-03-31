import { Router } from "express";
import authGuard from "../../middleware/authGuard.js";
import { categoryController } from "./category.controller.js";

const router = Router();

router.post("/", authGuard("admin"), categoryController.addCategory);
router.get("/", categoryController.getCategories);

export const categoryRouter = router;
