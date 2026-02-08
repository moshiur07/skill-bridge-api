import { Router } from "express";
import authGuard from "../../middleware/authGuard";
import { categoryController } from "./category.controller";
const router = Router();
router.post("/", authGuard("admin"), categoryController.addCategory);
export const categoryRouter = router;
//# sourceMappingURL=category.routes.js.map