export declare const reviewService: {
    createReview: (rating: number, comment: string, bookingId: string) => Promise<{
        rating: number;
        id: string;
        created_at: Date;
        comment: string;
        booking_id: string;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map