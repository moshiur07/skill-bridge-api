import { Request, Response } from "express";
export declare const bookingsController: {
    createBooking: (req: Request, res: Response) => Promise<void>;
    getBookings: (req: Request, res: Response) => Promise<void>;
    getBookingById: (req: Request, res: Response) => Promise<void>;
    payment: (req: Request, res: Response) => Promise<void>;
    sessionComplete: (req: Request, res: Response) => Promise<void>;
    deleteBooking: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=bookings.controller.d.ts.map