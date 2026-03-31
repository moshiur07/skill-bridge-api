import z from "zod";

const timeHHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createTutorZodSchema = z.object({
  bio: z.string().min(5).max(2000),
  hourly_rate: z.number().int().nonnegative(),
  categories: z.array(z.number()).optional(),
});

export const updateTutorZodSchema = z.object({
  body: z
    .object({
      bio: z.string().min(5).max(2000).optional(),
      hourly_rate: z.number().int().nonnegative().optional(),
      image: z.string().url().optional(),
      isFeatured: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
      categories: z.array(z.number()).optional(),
      schedules: z
        .array(
          z.object({
            id: z.string().uuid().optional(),
            day_of_week: z.number().int().min(0).max(6),
            start_time: z
              .string()
              .regex(timeHHMM, "Invalid time format, expected HH:MM"),
            end_time: z
              .string()
              .regex(timeHHMM, "Invalid time format, expected HH:MM"),
          }),
        )
        .optional(),
      availabilities: z
        .array(
          z.object({
            id: z.string().uuid().optional(),
            start_date_time: z
              .string()
              .refine((v) => !Number.isNaN(Date.parse(v)), {
                message: "Invalid ISO datetime",
              }),
            end_date_time: z
              .string()
              .refine((v) => !Number.isNaN(Date.parse(v)), {
                message: "Invalid ISO datetime",
              }),
            is_booked: z.boolean().optional(),
          }),
        )
        .optional(),
    })
    .partial(), // allow partial updates
});
