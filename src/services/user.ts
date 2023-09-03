import { type RequestEventLoader } from "@builder.io/qwik-city";
import type { Prisma, User } from "@prisma/client";
import { db } from "~/database/connection";
import { alreadyFollow } from "./follow";

const findUserByUsername = async (username: string) =>
  db.user.findFirst({ where: { username } });

const createUser = async (user: Prisma.UserCreateInput) =>
  await db.user.create({
    data: {
      ...user,
      profile: { create: {} },
    },
  });

const isEmailExists = async (email: string) => {
  const data = await db.user.findFirst({
    where: { email },
  });

  if (data) return true;
  return false;
};

const isUsernameExists = async (username: string) => {
  const data = await db.user.findFirst({
    where: { username },
  });

  if (data) return true;
  return false;
};

const findUserForLogin = async (email: string) =>
  await db.user.findFirst({
    where: { email },
  });

const updateUser = async (id: number, user: Prisma.UserUpdateInput) =>
  await db.user.update({ where: { id }, data: { ...user } });

const findUserById = async (id: number) =>
  db.user.findFirst({
    where: { id },
  });

const findUserForAuthorization = async (id: number) =>
  db.user.findFirst({
    where: { id },
    select: {
      username: true,
      id: true,
      avatar: true,
    },
  });

const fetchUsersSuggestion = async ({ sharedMap }: RequestEventLoader) => {
  const user = sharedMap.get("user") as User | undefined;
  if (!user) return [];
  const users = await db.user.findMany({
    take: 6,
    where: {
      id: {
        not: user.id,
      },
    },
    select: {
      id: true,
    },
  });

  const results = [];

  for (const otherUser of users) {
    const isFollowing = await alreadyFollow(user.id, otherUser.id);
    results.push({
      ...otherUser,
      isFollowing,
    });
  }
  return results;
};

const fetchAllUserSuggestions = async ({ sharedMap }: RequestEventLoader) => {
  const user = sharedMap.get("user");
  const users = await db.user.findMany({
    where: {
      id: { not: user.id },
    },
    select: {
      id: true,
      username: true,
    },
  });

  const results = [];

  for (const otherUser of users) {
    const isFollowing = await alreadyFollow(user.id, otherUser.id);
    results.push({
      ...otherUser,
      isFollowing,
    });
  }
  return results;
};
export {
  createUser,
  isEmailExists,
  isUsernameExists,
  findUserForLogin,
  updateUser,
  findUserById,
  findUserForAuthorization,
  fetchUsersSuggestion,
  findUserByUsername,
  fetchAllUserSuggestions,
};
