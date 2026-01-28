import { Role, TutorProfile } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createTutor = async (payload: any, user_id: string) => {
  const data = { ...payload };
  delete data.category;
  console.log(data);
  const category: string[] = payload.category;
  const result = await prisma.tutorProfile.create({ data });
  if (result) {
    // * update role
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        role: Role.tutor,
      },
    });
    console.log("role updated");
    // * update category
    await prisma.tutorProfile.update({
      where: { user_id: user_id },
      data: {
        categories: {
          set: category.map((id) => ({ id })),
        },
      },
    });
    console.log("category inserted updated");
  }
  return result;
};

export const tutorServices = {
  createTutor,
};
