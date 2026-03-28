import { Request, Response } from "express";
import { bookingServices } from "./bookings.service.js";

const createBooking = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  console.log(user_id);
  const bookingData = req.body;
  try {
    const result = await bookingServices.createBooking(
      bookingData,
      user_id as string,
    );
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    console.log(err);
  }
};

const getBookings = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const role = req.user?.role;
  try {
    const result = await bookingServices.getBookings(
      user_id as string,
      role as string,
    );
    res.status(200).json({
      success: true,
      data: result?.bookings,
      stats: result?.stats,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const getBookingById = async (req: Request, res: Response) => {
  const role = req.user?.role;
  const booking_id = req.params.id;
  try {
    const result = await bookingServices.getBookingsById(
      booking_id as string,
      role as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const payment = async (req: Request, res: Response) => {
  const booking_id = req.params.id;
  try {
    const result = await bookingServices.payment(booking_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const sessionComplete = async (req: Request, res: Response) => {
  const booking_id = req.params.id;
  try {
    const result = await bookingServices.sessionComplete(booking_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const booking_id = req.params.id;
  try {
    const result = await bookingServices.deleteBooking(booking_id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingsController = {
  createBooking,
  getBookings,
  getBookingById,
  payment,
  sessionComplete,
  deleteBooking,
};
