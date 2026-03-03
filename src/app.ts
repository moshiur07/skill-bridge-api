import express, { Application, Request, Response } from "express";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { tutorRouter } from "./modules/tutor/tutor.routes.js";
import { bookingsRouter } from "./modules/bookings/bookings.routes.js";
import { reviewsRouter } from "./modules/reviews/review.routes.js";
import { categoryRouter } from "./modules/categories/category.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { adminRoutes } from "./modules/admin/admin.routes.js";

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
].filter(Boolean);

const app: Application = express();
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches deployment patterns
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) || // Vercel deployments
        /^https:\/\/.*\.onrender\.com$/.test(origin) || // Render deployments
        /^https:\/\/.*\.netlify\.app$/.test(origin); // Netlify deployments (optional)

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`); // For debugging
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);
// * better auth
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

// * Tutors
app.use("/api/tutors", tutorRouter);

// * Bookings
app.use("/api/bookings", bookingsRouter);

// * Reviews
app.use("/api/reviews", reviewsRouter);

// * category

app.use("/api/category", categoryRouter);

// * users
app.use("/api/users", usersRoutes);

// * admin

app.use("/api/admin", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
