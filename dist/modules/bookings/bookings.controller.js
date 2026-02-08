import { bookingServices } from "./bookings.service";
const createBooking = async (req, res) => {
    const user_id = req.user?.id;
    const bookingData = req.body;
    try {
        const result = await bookingServices.createBooking(bookingData, user_id);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const getBookings = async (req, res) => {
    const user_id = req.user?.id;
    const role = req.user?.role;
    console.log(`this req is from a ${role}`);
    try {
        const result = await bookingServices.getBookings(user_id, role);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const getBookingById = async (req, res) => {
    const role = req.user?.role;
    const booking_id = req.params.id;
    console.log(`this req is from a ${role}`);
    try {
        const result = await bookingServices.getBookingsById(booking_id, role);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const payment = async (req, res) => {
    const booking_id = req.params.id;
    try {
        const result = await bookingServices.payment(booking_id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const sessionComplete = async (req, res) => {
    const booking_id = req.params.id;
    try {
        const result = await bookingServices.sessionComplete(booking_id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteBooking = async (req, res) => {
    const booking_id = req.params.id;
    try {
        const result = await bookingServices.deleteBooking(booking_id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
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
//# sourceMappingURL=bookings.controller.js.map