import { Router } from "express";
import { usersController } from "./users.controller.js";
import authGuard from "../../middleware/authGuard.js";

const router = Router();

router.put("/:id/status", authGuard("admin"), usersController.handleBan);

router.get("/:id", authGuard("admin", "student"), usersController.getUserById);

router.get("/", authGuard("admin"), usersController.getUsers);
router.get("/:userId/tutor-id", usersController.getTutorIdByUserId);

router.put("/:id", authGuard("student"), usersController.updateUserData);

router.delete("/:id", authGuard("admin"), usersController.deleteUser);
export const usersRoutes = router;
