import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Helpers
const getUserIds = async () =>
  (await prisma.user.findMany({ select: { id: true } })).map((u) => u.id);

const getPostIds = async () =>
  (await prisma.post.findMany({ select: { id: true } })).map((p) => p.id);

const getCommentIds = async () =>
  (await prisma.comment.findMany({ select: { id: true } })).map((r) => r.id);

const shuffleArray = (arr: unknown[]) => arr.sort(() => Math.random() - 0.5);

// Content generators
const createUsers = async (length: number) => {
  const users = await Promise.all(
    Array.from({ length }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.displayName(),
          color: faker.internet.color(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        },
      })
    )
  );
  console.log(`Created ${users.length} users`);
  return users.map((user) => user.id);
};

const createPosts = async (length: number) => {
  // Get all user ids to assign to posts randomly
  const userIds = await getUserIds();

  // Create posts
  const posts = await Promise.all(
    Array.from({ length }).map(() =>
      prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph({ min: 1, max: 10 }),
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          thumbnail: faker.image.url(),
          createdAt: faker.date.past(),
          slug: faker.lorem.slug(),
        },
      })
    )
  );
  console.log(`Created ${posts.length} posts`);

  return posts.map((post) => post.id);
};

const createComments = async (length: number) => {
  const userIds = await getUserIds();
  const postIds = await getPostIds();

  const comments = await Promise.all(
    Array.from({ length }).map(() =>
      prisma.comment.create({
        data: {
          message: faker.lorem.paragraph({ min: 1, max: 10 }),
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          postId: postIds[Math.floor(Math.random() * postIds.length)],
          createdAt: faker.date.past(),
        },
      })
    )
  );
  console.log(`Created ${comments.length} comments`);
  return;
};

const createCommentLikes = async (factor: number) => {
  const userIds = await getUserIds();
  const commentIds = await getCommentIds();

  // Maximum number of likes possible
  const maxLikes = userIds.length;
  console.log("maxLikes", maxLikes);
  // Random number of likes
  const likes = Math.floor(Math.random() * (maxLikes + 1));
  console.log("likes", likes);
  // Maximum number of dislikes
  const maxDislikes = userIds.length - likes;
  console.log("maxDislikes", maxDislikes);
  // Random number of dislikes
  const dislikes = Math.floor(Math.random() * (maxDislikes + 1));
  console.log("dislikes", dislikes);

  const shuffledComments = shuffleArray(commentIds).slice(
    0,
    commentIds.length * factor
  );
  console.log(shuffledComments.length);
  const likedComments = shuffledComments.slice(0, likes) as number[];
  const dislikedComments = shuffledComments.slice(
    likes,
    likes + dislikes
  ) as number[];

  const shuffledUsers = shuffleArray(userIds);
  const likeUsers = shuffledUsers.slice(0, likes) as number[];
  const dislikeUsers = shuffledUsers.slice(likes, likes + dislikes) as number[];

  const commentLikes = await Promise.all(
    Array.from({ length: likes }).map(
      async (_, index: number) =>
        await prisma.commentLike.create({
          data: {
            commentId: likedComments[index],
            userId: likeUsers[index],
          },
        })
    )
  );
  console.log(`Created ${commentLikes.length} comment likes`);

  const commentDislikes = await Promise.all(
    Array.from({ length: dislikes }).map(
      async (_, index: number) =>
        await prisma.commentDislike.create({
          data: {
            commentId: dislikedComments[index],
            userId: dislikeUsers[index],
          },
        })
    )
  );
  console.log(`Created ${commentDislikes.length} comment likes`);

  return;
};

const createReplies = async (factor: number) => {
  console.log("create replies");
  const commentIds = await getCommentIds();
  const userIds = await getUserIds();

  const replies = await Promise.all(
    Array.from({ length: commentIds.length * factor }).map(async () => {
      // Get a random comment
      const commentId =
        commentIds[Math.floor(Math.random() * commentIds.length)];
      // Get the post id of the comment
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { postId: true },
      });
      if (!comment) throw new Error("Comment not found");
      const postId = comment.postId;
      const userId = userIds[Math.floor(Math.random() * userIds.length)];

      return prisma.comment.create({
        data: {
          message: faker.lorem.paragraph({ min: 1, max: 10 }),
          userId,
          postId,
          createdAt: faker.date.past(),
          parentId: commentId,
        },
      });
    })
  );
  const replyIds = replies.map((reply) => reply.id);
  console.log(`Created ${replyIds.length} replies`);
};

// // Subscribers
// const createSubscriber = async () => {};

async function seed() {
  await prisma.comment.deleteMany();
  await prisma.commentLike.deleteMany();
  await prisma.commentDislike.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const userIds = await createUsers(100);
  const postIds = await createPosts(userIds.length / 5);
  await createComments(postIds.length * 20);
  await createCommentLikes(0.5);
  await createReplies(12);
}

seed();
