import { BookingStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

const createBooking = async (
  bookingData: {
    duration_hours: number;
    tutor_id: string;
  },
  user_id: string,
) => {
  const { duration_hours, tutor_id } = bookingData;

  const tutor = await prisma.tutorProfile.findUniqueOrThrow({
    where: { id: tutor_id },
    include: { availabilities: true },
  });
  const availabilities = tutor.availabilities;
  if (availabilities.length === 0) {
    throw new Error("No availabilities found for this tutor");
  }
  const availability_id = availabilities.find((avail) => !avail.is_booked)?.id;
  if (!availability_id) {
    throw new Error("All availabilities for this tutor are booked");
  }

  const total_price = tutor.hourly_rate * duration_hours;

  const data = {
    student_id: user_id,
    tutor_id: tutor_id,
    duration_hours: duration_hours,
    total_price: total_price,
    availability_id: availability_id,
  };

  return await prisma.booking.create({
    data: data,
  });
};

const getBookings = async (user_id: string, role: string) => {
  if (role === "student") {
    return await prisma.booking.findMany({
      where: { student_id: user_id },
      include: {
        tutor: true,
        student: true,
        review: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    });
  } else if (role === "tutor") {
    return await prisma.booking.findMany({
      where: { tutor_id: user_id },
      include: {
        tutor: true,
        student: true,
        review: true,
      },
    });
  }
  throw new Error("Invalid role");
};

const getBookingsById = async (booking_id: string, role: string) => {
  if (role === "student") {
    return await prisma.booking.findFirst({
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
    return await prisma.booking.findFirst({
      where: { id: booking_id },
      include: {
        tutor: true,
        student: true,
        review: true,
      },
    });
  } else if (role === "admin") {
    return await prisma.booking.findFirst({
      where: { id: booking_id },
      include: {
        tutor: true,
        student: true,
        review: true,
        availability: true,
      },
    });
  }
  throw new Error("Invalid role");
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
    throw new Error("Booking not found");
  }
  if (booking.status !== BookingStatus.pending) {
    throw new Error("Only pending bookings can be deleted");
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
