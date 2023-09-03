import {
  type RequestEventLoader,
  type RequestEventAction,
} from "@builder.io/qwik-city";
import type { User } from "@prisma/client";
import { db } from "~/database/connection";
import { findUserByUsername } from "./user";

const alreadyFollow = async (userId: number, otherUserId: number) => {
  const data = await db.follows.findFirst({
    where: {
      followerId: userId,
      followingId: otherUserId,
    },
  });
  if (data) return true;
  return false;
};

const unfollowUser = async (userId: number, otherUserId: number) =>
  await db.follows.deleteMany({
    where: {
      followerId: userId,
      followingId: otherUserId,
    },
  });

const followUser = async (userId: number, otherUserId: number) =>
  db.follows.create({
    data: {
      followerId: userId,
      followingId: otherUserId,
    },
  });

const handleFollowUnfollow = async (
  otherUserId: number,
  { redirect, url, sharedMap, error }: RequestEventAction
) => {
  const user = sharedMap.get("user") as User | undefined;
  if (!user) throw error(403, "Unauthorized");
  const follow = await alreadyFollow(user.id, otherUserId);
  if (follow) {
    // handle unfollow user
    await unfollowUser(user.id, otherUserId);
  } else {
    // follow user
    await followUser(user.id, otherUserId);
  }
  throw redirect(302, url.pathname);
};

const fetchFollowCount = async (userId: number) =>
  await db.follows.count({
    select: { followingId: true },
    where: { followerId: userId },
  });

const fetchFollowers = async (userId: number) => {
  return db.follows.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const fetchFollowings = (userId: number) => {
  return db.follows.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const fetchProfileFollowers = async ({
  params,
  error,
  sharedMap,
}: RequestEventLoader) => {
  const currentUser = sharedMap.get("user");
  const user = await findUserByUsername(params.username);
  if (!user) throw error(404, "User not found");
  const followers = await fetchFollowers(user.id);
  const results = [];

  for (const follower of followers) {
    const isFollowing = await alreadyFollow(
      currentUser?.id,
      follower.followerId
    );
    results.push({
      followingId: follower.followingId,
      isFollowing,
    });
  }
  return results;
};

const fetchProfileFollowings = async ({
  params,
  error,
  sharedMap,
}: RequestEventLoader) => {
  const currentUser = sharedMap.get("user");
  const user = await findUserByUsername(params.username);
  if (!user) throw error(404, "User not found");
  const followings = await fetchFollowings(user.id);
  const results = [];

  for (const following of followings) {
    const isFollowing = await alreadyFollow(
      currentUser?.id,
      following.followingId
    );
    results.push({
      followingId: following.followerId,
      isFollowing,
    });
  }
  return results;
};

export {
  handleFollowUnfollow,
  alreadyFollow,
  fetchFollowCount,
  fetchProfileFollowers,
  fetchProfileFollowings,
};
