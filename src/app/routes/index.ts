import { Router } from "express";
import { tutorRouter } from "../modules/tutor/tutor.routes";
import { bookingsRouter } from "../modules/bookings/bookings.routes";
import { reviewsRouter } from "../modules/reviews/review.routes";
import { categoryRouter } from "../modules/categories/category.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

const router = Router();

// * Tutors
router.use("/tutors", tutorRouter);

// * Bookings
router.use("/bookings", bookingsRouter);

// * Reviews
router.use("/reviews", reviewsRouter);

// * category

router.use("/category", categoryRouter);

// * users
router.use("/users", usersRoutes);

// * admin

router.use("/admin", adminRoutes);

export const indexRoutes = router;
