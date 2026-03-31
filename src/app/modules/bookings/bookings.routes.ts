import { Router } from "express";
import authGuard from "../../middleware/authGuard.js";
import { bookingsController } from "./bookings.controller.js";
import { createBookingZodSchema } from "./booking.validation.js";
import { validateRequest } from "../../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  authGuard("student"),
  validateRequest(createBookingZodSchema),
  bookingsController.createBooking,
);

router.get(
  "/me",
  authGuard("student", "tutor"),
  bookingsController.getBookings,
);
router.get(
  "/:id",
  authGuard("student", "tutor", "admin"),
  bookingsController.getBookingById,
);

router.put("/:id/payment", authGuard("student"), bookingsController.payment);

router.put(
  "/:id/complete",
  authGuard("tutor"),
  bookingsController.sessionComplete,
);

router.delete(
  "/:id/cancel",
  authGuard("student"),
  bookingsController.deleteBooking,
);

export const bookingsRouter = router;
