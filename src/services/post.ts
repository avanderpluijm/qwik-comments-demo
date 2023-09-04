import { db } from "~/database/connection";

export const getPostBySlug = async (slug: string) =>
  await db.post.findFirst({
    where: { slug },
    include: {
      _count: { select: { comments: { where: { parent: null } } } },
      user: {
        select: { id: true, username: true, avatar: true },
      },
    },
  });

export const getRandomPosts = async (count: number) => {
  const itemCount = await db.post.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - count);

  return await db.post.findMany({
    include: {
      _count: { select: { comments: { where: { parent: null } } } },
      user: true,
    },
    take: count,
    skip,
  });
};
