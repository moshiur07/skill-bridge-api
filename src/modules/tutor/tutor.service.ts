import { Role, TutorProfile } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

const createTutor = async (payload: any, user_id: string) => {
  const data = { ...payload, user_id };
  delete data.category;
  const category: number[] = payload.category;
  const result = await prisma.tutorProfile.create({ data });
  if (result) {
    await prisma.$transaction([
      //* Update  Role
      prisma.user.update({
        where: { id: user_id },
        data: { role: Role.tutor },
      }),

      //* Connect Categories
      prisma.tutorProfile.update({
        where: { user_id: user_id },
        data: {
          categories: {
            connect: category.map((id) => ({ id: Number(id) })),
          },
        },
      }),
    ]);

    console.log("Role and Categories successfully updated");
  }
  return result;
};

const getTutors = async ({
  search,
  category,
  rating,
  price,
  limit,
  skip,
}: {
  search?: string | undefined;
  category?: number | undefined;
  rating?: number | undefined;
  price?: number | undefined;
  limit: number;
  skip: number;
}) => {
  let andConditions: any[] = [];
  if (search) {
    andConditions.push({
      OR: [
        { user: { name: { contains: search, mode: "insensitive" } } },
        {
          categories: {
            some: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
      ],
    });
  }
  if (category !== undefined) {
    andConditions.push({
      categories: {
        some: {
          id: category,
        },
      },
    });
  }
  if (rating !== undefined) {
    andConditions.push({
      rating_average: {
        gte: Number(rating),
      },
    });
  }
  if (price !== undefined) {
    andConditions.push({
      hourly_rate: {
        lte: Number(price),
      },
    });
  }
  const tutors: TutorProfile[] = await prisma.tutorProfile.findMany({
    skip,
    take: limit,
    where: {
      AND: andConditions,
    },
    include: {
      categories: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return tutors;
};

const getSingleTutor = async (tutorId: string) => {
  // in this case dynamic params could have userId as tutorId or it could be tutorId itself, so first we will try to find with userId and if not found then we will try with tutorId
  const getProfileByUserId = await prisma.tutorProfile.findUnique({
    where: { user_id: tutorId },
    include: {
      categories: true,
      user: true,
      bookings: {
        where: {
          tutor: {
            user_id: tutorId,
          },
        },
        include: {
          review: true,
        },
      },
      availabilities: true,
    },
  });

  if (!getProfileByUserId) {
    return await prisma.tutorProfile.findUnique({
      where: { id: tutorId },
      include: {
        categories: true,
        user: true,
        bookings: {
          where: {
            tutor_id: tutorId,
          },
          include: {
            review: true,
          },
        },
        availabilities: true,
      },
    });
  }

  return getProfileByUserId;
};

const updateSchedule = async (tutorId: string, scheduleData: any) => {
  const schedule: any = {
    day_of_week: scheduleData.day_of_week,
    start_time: scheduleData.start_time,
    end_time: scheduleData.end_time,
  };

  const availability = {
    start_date_time: scheduleData.start_time,
    end_date_time: scheduleData.end_time,
    tutor_id: tutorId,
  };
  return await prisma.$transaction(
    async (prisma) => {
      await prisma.schedule.create({
        data: {
          ...schedule,
          tutor_id: tutorId,
        },
      });
      await prisma.availability.create({
        data: { ...availability },
      });
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );
};

const updateTutor = async (tutorId: string, updateData: any) => {
  const dataToUpdate: any = { ...updateData };
  const categoryIds: number[] = dataToUpdate.categories;
  delete dataToUpdate.categories;

  return await prisma.tutorProfile.update({
    where: {
      id: tutorId,
    },
    data: {
      ...dataToUpdate,
      categories: {
        connect: categoryIds?.map((id) => ({ id: Number(id) })) || [],
      },
    },
  });
};

const getAvailability = async (tutorId: string) => {
  return await prisma.availability.findMany({
    where: {
      tutor_id: tutorId,
    },
  });
};
const setAvailability = async (tutorId: string, availabilityData: any) => {
  const availability = {
    start_date_time: availabilityData.start_date_time,
    end_date_time: availabilityData.end_date_time,
    tutor_id: tutorId,
  };
  console.log("api is hitted!!!!!!");
  return await prisma.availability.create({
    data: {
      ...availability,
    },
  });
};

const deleteAvailability = async (availabilityId: string) => {
  const avail = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });
  if (!avail || avail.is_booked) {
    throw new Error("Only unbooked or completed slots can be removed.");
  }
  // return await prisma.availability.delete({
  //   where: {
  //     id: availabilityId,
  //   },
  // });
  return await prisma.$transaction(async (tx) => {
    // 1. Delete the history first (The "Children")
    await tx.booking.deleteMany({
      where: { availability_id: availabilityId },
    });

    // 2. Now delete the slot (The "Parent")
    return await tx.availability.delete({
      where: { id: availabilityId },
    });
  });
};

const updateFeatured = async (tutorId: string) => {
  // 1. Fetch the current profile to see the existing state
  const profile = await prisma.tutorProfile.findUnique({
    where: { user_id: tutorId },
    select: { isFeatured: true }, // Optimization: only select the field we need
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }

  // 2. Update with the opposite value
  return await prisma.tutorProfile.update({
    where: { user_id: tutorId },
    data: {
      isFeatured: !profile.isFeatured,
    },
  });
};

const deleteTutor = async (tutorId: string) => {
  // ! had to check is there any booking on going with this tutor before deleting
  const ongoingBooking = await prisma.booking.findFirst({
    where: {
      tutor_id: tutorId,
      status: "completed",
    },
  });
  if (ongoingBooking) {
    throw new Error("Tutor has ongoing bookings and cannot be deleted");
  }
  return await prisma.tutorProfile.delete({
    where: { id: tutorId },
  });
};

export const tutorServices = {
  createTutor,
  getTutors,
  deleteTutor,
  getSingleTutor,
  updateSchedule,
  updateTutor,
  updateFeatured,
  getAvailability,
  setAvailability,
  deleteAvailability,
};
