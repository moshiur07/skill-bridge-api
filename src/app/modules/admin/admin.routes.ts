import { Router } from "express";
import { adminController } from "./admin.controller.js";
import authGuard from "../../middleware/authGuard.js";

const router = Router();

router.get(
  "/dashboard-stats",
  authGuard("admin"),
  adminController.getAdminDashboardStats,
);

router.get("/users", authGuard("admin"), adminController.getUsersByAdmin);

router.get("/bookings", authGuard("admin"), adminController.getAllBookings);

router.get("/categories", authGuard("admin"), adminController.getAllCategories);

router.post("/categories", authGuard("admin"), adminController.createCategory);

router.delete(
  "/categories/:id",
  authGuard("admin"),
  adminController.deleteCategory,
);

export const adminRoutes = router;
