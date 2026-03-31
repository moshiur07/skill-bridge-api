import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { Role } from "@prisma/client";
import { envVars } from "../../config/env.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  baseURL: envVars.BETTER_AUTH_URL,
  trustedOrigins: [
    envVars.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000",
  ].filter(Boolean),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.student,
        required: false,
      },
      isDeleted: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      isBanned: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      image: {
        type: "string",
        defaultValue: null,
        required: false,
      },
      deletedAt: {
        type: "date",
        defaultValue: null,
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackUrl: envVars.GOOGLE_CALLBACK_URL,
    },
  },
});
