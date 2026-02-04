import { BookingStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createReview = async (
  rating: number,
  comment: string,
  bookingId: string,
) => {
  return await prisma.$transaction(async (prisma) => {
    //* is the booking completed?
    const booking = await prisma.booking.findUniqueOrThrow({
      where: { id: bookingId, status: BookingStatus.completed },
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
        booking_id: bookingId,
      },
    });
    return newReview;
  });
};

export const reviewService = {
  createReview,
};
