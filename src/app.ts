import express, { Application, Request, Response } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { tutorRouter } from "./modules/tutor/tutor.routes";
import { bookingsRouter } from "./modules/bookings/bookings.routes";
import { reviewsRouter } from "./modules/reviews/review.routes";
import { categoryRouter } from "./modules/categories/category.routes";

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
].filter(Boolean); // Remove undefined values

const app: Application = express();

// app.use(
//   cors({
//     origin: process.env.APP_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
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
app.use("/api/tutor", tutorRouter);

// * Bookings
app.use("/api/bookings", bookingsRouter);

// * Reviews
app.use("/api/reviews", reviewsRouter);

// * category

app.use("/api/category", categoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
