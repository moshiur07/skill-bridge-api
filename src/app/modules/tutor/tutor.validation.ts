//TODO:  zod schema for post , put and patch request for tutor module

import z from "zod";

export const createTutorZodSchema = z.object({
  password: z
    .string("password is required and must be string")
    .min(6, "Password must be at least 6 characters long"),
  tutor: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(30, "Name must be less than 30 characters"),
    email: z.email("Invalid email address"),
    contactNumber: z
      .string()
      .min(11, "Please enter a valid number of at least 11")
      .max(14, "Please enter a valid number of at most 14"),
    address: z.string().optional(),
    registrationNumber: z.string(),
    experience: z.number(),
    appointmentFee: z.number(),
    qualification: z.string(),
    currentWorkplace: z.string(),
    designation: z.string(),
    profilePhoto: z.string(),
  }),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
});
