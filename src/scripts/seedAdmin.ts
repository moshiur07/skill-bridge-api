import { Role } from "../../generated/prisma";
import { prisma } from "../lib/prisma.js";

const seedAdmin = async () => {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: Role.admin,
    };

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminData.email as string,
      },
    });
    console.log(existingAdmin);
    if (existingAdmin) throw new Error("Admin user already exists");
    const createAdmin = await fetch(
      `${process.env.BETTER_AUTH_URL}/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: `${process.env.APP_URL}`,
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
