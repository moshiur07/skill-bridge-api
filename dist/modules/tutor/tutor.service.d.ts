export declare const tutorServices: {
    createTutor: (payload: any, user_id: string) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    }>;
    getTutors: ({ search, category, rating, price, limit, skip, }: {
        search?: string | undefined;
        category?: number | undefined;
        rating?: number | undefined;
        price?: number | undefined;
        limit: number;
        skip: number;
    }) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    }[]>;
    deleteTutor: (tutorId: string) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    }>;
    getSingleTutor: (tutorId: string) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    } | null>;
    updateSchedule: (tutorId: string, scheduleData: any) => Promise<void>;
    updateTutor: (tutorId: string, updateData: any) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    }>;
    updateFeatured: (tutorId: string, featured: boolean) => Promise<{
        id: string;
        bio: string;
        hourly_rate: number;
        rating_average: number;
        isFeatured: boolean;
        user_id: string;
    }>;
};
//# sourceMappingURL=tutor.service.d.ts.map