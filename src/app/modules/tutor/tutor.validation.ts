import z from "zod";

// const timeHHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createTutorZodSchema = z.object({
  bio: z.string().min(5).max(2000),
  hourly_rate: z.number().int().nonnegative(),
  categories: z.array(z.number()).optional(),
});

export const updateTutorZodSchema = z.object({
  bio: z.string().min(5).max(2000),
  hourly_rate: z.number().int().nonnegative(),
  categories: z.array(z.number()).optional(),
});
