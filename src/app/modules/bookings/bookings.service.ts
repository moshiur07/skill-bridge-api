import { BookingStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../../helper/AppError.js";
import status from "http-status";

const createBooking = async (
  bookingData: {
    duration_hours: number;
    tutor_id: string;
    subject: string;
    availability_id: string;
  },
  user_id: string,
) => {
  const { duration_hours, tutor_id, subject, availability_id } = bookingData;
  console.log({ bookingData });
  const tutor = await prisma.tutorProfile.findUniqueOrThrow({
    where: { id: tutor_id },
    include: { availabilities: true },
  });
  const availability = await prisma.availability.findUnique({
    where: { id: bookingData.availability_id, is_booked: false },
  });
  if (!availability) {
    throw new AppError(status.NOT_FOUND, "No availabilities found");
  }

  const total_price = tutor.hourly_rate * duration_hours;

  const data = {
    student_id: user_id,
    tutor_id: tutor_id,
    duration_hours: duration_hours,
    total_price: total_price,
    availability_id: availability_id,
    subject: subject,
  };
  console.log("data before booking", data);

  await prisma.availability.update({
    where: { id: availability_id },
    data: { is_booked: true },
  });

  return await prisma.booking.create({
    data: data,
  });
};

const getBookings = async (user_id: string, role: string) => {
  if (role === "student") {
    const bookings = await prisma.booking.findMany({
      where: { student_id: user_id },
      include: {
        tutor: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        student: true,
        review: { select: { rating: true, comment: true } },
      },
    });
    // Calculate stats
    const stats = {
      total_bookings: bookings.length,
      total_spent: bookings
        .filter((b) => b.status === "completed")
        .reduce((sum, booking) => sum + booking.total_price, 0),

      completed: bookings.filter((b) => b.status === "completed").length,

      upcoming: bookings.filter((b) => b.status === "pending").length,
    };

    return {
      bookings,
      stats,
    };
  } else if (role === "tutor") {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { user_id: user_id },
    });

    if (!tutorProfile) {
      throw new AppError(status.NOT_FOUND, "Tutor profile not found");
    }

    const bookings = await prisma.booking.findMany({
      where: { tutor_id: tutorProfile.id },
      include: {
        tutor: {
          include: {
            categories: true,
            availabilities: true,
          },
        },
        student: true,
        review: true,
      },
    });
    if (!bookings) throw new AppError(status.NOT_FOUND, "Tutor not found");

    // Calculate stats
    const stats = {
      total_earnings: bookings
        .filter((b) => b.status === "completed")
        .reduce((sum, booking) => sum + booking.total_price, 0),

      completed_sessions: bookings.filter((b) => b.status === "completed")
        .length,

      pending_bookings: bookings.filter((b) => b.status === "pending").length,

      total_reviews: bookings.filter((b) => b.review).length,

      rating_average:
        bookings.filter((b) => b.review).length > 0
          ? bookings
              .filter((b) => b.review)
              .reduce((sum, b) => sum + (b.review?.rating || 0), 0) /
            bookings.filter((b) => b.review).length
          : 0,
    };

    return {
      bookings,
      stats,
    };
  }

  throw new AppError(status.BAD_REQUEST, "Invalid role");
};

const getBookingsById = async (booking_id: string, role: string) => {
  if (role === "student") {
    return await prisma.booking.findUnique({
      where: { id: booking_id },
      include: {
        tutor: true,
        review: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    });
  } else if (role === "tutor") {
    return await prisma.booking.findUnique({
      where: { id: booking_id },
      include: {
        tutor: true,
        student: true,
        review: true,
      },
    });
  } else if (role === "admin") {
    return await prisma.booking.findUnique({
      where: { id: booking_id },
      include: {
        tutor: true,
        student: true,
        review: true,
        availability: true,
      },
    });
  }
  throw new AppError(status.BAD_REQUEST, "Invalid role");
};

const payment = async (booking_id: string) => {
  return await prisma.$transaction(async (prisma) => {
    const booking = await prisma.booking.update({
      where: { id: booking_id },
      data: { status: BookingStatus.confirmed },
    });
    await prisma.availability.update({
      where: { id: booking.availability_id },
      data: { is_booked: true },
    });
    return booking;
  });
};

const sessionComplete = async (booking_id: string) => {
  return await prisma.$transaction(async (prisma) => {
    const booking = await prisma.booking.update({
      where: { id: booking_id },
      data: { status: BookingStatus.completed },
    });
    await prisma.availability.update({
      where: { id: booking.availability_id },
      data: { is_booked: false },
    });
    return booking;
  });
};

const deleteBooking = async (booking_id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: booking_id },
  });
  if (!booking) {
    throw new AppError(status.NOT_FOUND, "Booking not found");
  }
  if (booking.status !== BookingStatus.pending) {
    throw new AppError(
      status.BAD_REQUEST,
      "Only pending bookings can be deleted",
    );
  }
  return await prisma.booking.delete({
    where: { id: booking_id },
  });
};
export const bookingServices = {
  createBooking,
  getBookings,
  getBookingsById,
  payment,
  sessionComplete,
  deleteBooking,
};
