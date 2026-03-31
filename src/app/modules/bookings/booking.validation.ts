import z from "zod";

export const createBookingZodSchema = z.object({
  body: z.object({
    tutor_id: z.string().uuid(),
    student_id: z.string().uuid(),
    availability_id: z.string().uuid().optional(),
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
    hourly_rate: z.number().int().nonnegative().optional(),
    total_amount: z.number().nonnegative().optional(),
    is_paid: z.boolean().optional(),
    notes: z.string().min(1).max(1000).optional(),
  }),
});
