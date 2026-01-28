import { Role, TutorProfile } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

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

      //   * Connect Categories
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

export const tutorServices = {
  createTutor,
};
