import express from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { tutorRouter } from "./modules/tutor/tutor.routes";
import { bookingsRouter } from "./modules/bookings/bookings.routes";
import { reviewsRouter } from "./modules/reviews/review.routes";
import { categoryRouter } from "./modules/categories/category.routes";
const app = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
}));
// * better auth
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
// * Tutors
app.use("/api/tutor", tutorRouter);
// * Bookings
app.use("/api/bookings", bookingsRouter);
// * Reviews
app.use("/api/reviews", reviewsRouter);
// * category
app.use("/api/category", categoryRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
export default app;
//# sourceMappingURL=app.js.map