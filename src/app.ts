import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { auth } from "./app/lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./app/middleware/notFound";
// import { indexRoutes } from "./app/routes";
import { envVars } from "./config/env";
import { paymentController } from "./app/modules/payment/payment.controller";
import { indexRoutes } from "./app/routes/index";

// const allowedOrigins = [
//   process.env.APP_URL || "http://localhost:3000",
//   process.env.PROD_APP_URL,
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "http://localhost:5000",
// ].filter(Boolean);

const app: Application = express();
// previous
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (mobile apps, Postman, etc.)
//       if (!origin) return callback(null, true);

//       // Check if origin is in allowedOrigins or matches deployment patterns
//       const isAllowed =
//         allowedOrigins.includes(origin) ||
//         /^https:\/\/.*\.vercel\.app$/.test(origin) || // Vercel deployments
//         /^https:\/\/.*\.onrender\.com$/.test(origin) || // Render deployments
//         /^https:\/\/.*\.netlify\.app$/.test(origin); // Netlify deployments (optional)

//       if (isAllowed) {
//         callback(null, true);
//       } else {
//         console.warn(`CORS blocked origin: ${origin}`); // For debugging
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//     exposedHeaders: ["Set-Cookie"],
//   }),
// );

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleStripeWebhookEvent,
);

// testing with a simpler CORS setup first
// app.use(
//   cors({
//     origin: [
//       envVars.FRONTEND_URL,
//       envVars.BETTER_AUTH_URL,
//       "http://localhost:3000",
//       "http://localhost:5000",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  }),
);

// * better auth
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Skill Bridge API is running",
    version: "1.0.0",
    status: "healthy",
  });
});
app.use("/api", indexRoutes);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
