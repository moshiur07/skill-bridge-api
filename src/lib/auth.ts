import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [
    process.env.APP_URL!,
    process.env.PROD_APP_URL || "",
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000",
  ].filter(Boolean),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
});
