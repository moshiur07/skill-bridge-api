import { Router } from "express";
import authGuard from "../../middleware/authGuard";
import { bookingsController } from "./bookings.controller";
const router = Router();
router.post("/", authGuard("student"), bookingsController.createBooking);
router.get("/me", authGuard("student", "tutor"), bookingsController.getBookings);
router.get("/:id", authGuard("student", "tutor", "admin"), bookingsController.getBookingById);
router.put("/:id/payment", authGuard("student"), bookingsController.payment);
router.put("/:id/complete", authGuard("tutor"), bookingsController.sessionComplete);
router.delete("/:id/cancel", authGuard("student"), bookingsController.deleteBooking);
export const bookingsRouter = router;
//# sourceMappingURL=bookings.routes.js.map