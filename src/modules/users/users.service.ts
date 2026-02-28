import { prisma } from "../../lib/prisma.js";

const handleBan = async (user_id: string) => {
  // Toggle the isBanned status of the user

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      isBanned: !user.isBanned,
    },
  });
  return updatedUser;
};

const getUserById = async (user_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUserData = async (user_id: string, data: any) => {
  if (data.isBanned !== undefined) {
    delete data.isBanned;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: user_id,
    },
    data,
  });
  return updatedUser;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const deleteUser = async (user_id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  await prisma.user.delete({
    where: {
      id: user_id,
    },
  });
  return { message: "User deleted successfully" };
};

export const userService = {
  handleBan,
  getUserById,
  getUsers,
  updateUserData,
  deleteUser,
};
