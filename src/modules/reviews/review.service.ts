import { BookingStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

const createReview = async (
  rating: number,
  comment: string,
  booking_id: string,
) => {
  return await prisma.$transaction(async (prisma) => {
    //* is the booking completed?
    const booking = await prisma.booking.findUniqueOrThrow({
      where: { id: booking_id, status: BookingStatus.completed },
      include: { tutor: { select: { rating_average: true } } },
    });
    //* update tutor rating
    const updatedRating = await prisma.tutorProfile.update({
      where: { id: booking.tutor_id },
      data: {
        rating_average: (booking.tutor.rating_average + rating) / 2,
      },
    });

    //* create review
    const newReview = await prisma.review.create({
      data: {
        rating: updatedRating.rating_average,
        comment,
        booking_id: booking_id,
      },
    });
    return newReview;
  });
};

export const reviewService = {
  createReview,
};
