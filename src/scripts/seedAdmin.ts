import { envVars } from "./../config/env";
import { Role } from "@prisma/client";
import { prisma } from "../app/lib/prisma.js";
import AppError from "../helper/AppError.js";
import status from "http-status";

const seedAdmin = async () => {
  try {
    const adminData = {
      name: envVars.ADMIN_NAME,
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASSWORD,
      role: Role.admin,
    };

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminData.email as string,
      },
    });
    console.log(existingAdmin);
    if (existingAdmin)
      throw new AppError(status.CONFLICT, "Admin user already exists");
    const createAdmin = await fetch(
      `${envVars.BETTER_AUTH_URL}/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: `${envVars.FRONTEND_URL}`,
        },
        credentials: "include",
        body: JSON.stringify(adminData),
      },
    );
    if (createAdmin.ok) {
      console.log("Admin user seeded successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

seedAdmin();
