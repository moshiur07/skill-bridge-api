import { Role, TutorProfile } from "../../../generated/prisma";
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
  const tutor: TutorProfile | null = await prisma.tutorProfile.findUnique({
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
      schedules: true,
      availabilities: true,
    },
  });
  return tutor;
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

const updateFeatured = async (tutorId: string, featured: boolean) => {
  return await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      isFeatured: featured,
    },
  });
};

const deleteTutor = async (tutorId: string) => {
  // ! had to check is there any booking on going with this tutor before deleting
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
};
