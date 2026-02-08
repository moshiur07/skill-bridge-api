export declare const bookingServices: {
    createBooking: (bookingData: {
        duration_hours: number;
        tutor_id: string;
    }, user_id: string) => Promise<{
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    }>;
    getBookings: (user_id: string, role: string) => Promise<({
        student: {
            role: import("../../../generated/prisma").$Enums.Role;
            id: string;
            name: string;
            email: string;
            created_at: Date;
            updated_at: Date;
            emailVerified: boolean;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        tutor: {
            id: string;
            bio: string;
            hourly_rate: number;
            rating_average: number;
            isFeatured: boolean;
            user_id: string;
        };
        review: {
            rating: number;
            comment: string;
        } | null;
    } & {
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    })[]>;
    getBookingsById: (booking_id: string, role: string) => Promise<({
        tutor: {
            id: string;
            bio: string;
            hourly_rate: number;
            rating_average: number;
            isFeatured: boolean;
            user_id: string;
        };
        review: {
            rating: number;
            comment: string;
        } | null;
    } & {
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    }) | null>;
    payment: (booking_id: string) => Promise<{
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    }>;
    sessionComplete: (booking_id: string) => Promise<{
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    }>;
    deleteBooking: (booking_id: string) => Promise<{
        id: string;
        created_at: Date;
        tutor_id: string;
        duration_hours: number;
        total_price: number;
        status: import("../../../generated/prisma").$Enums.BookingStatus;
        student_id: string;
        availability_id: string;
    }>;
};
//# sourceMappingURL=bookings.service.d.ts.map