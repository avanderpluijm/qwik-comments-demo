import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create 100 users
  const users = await Promise.all(
    Array.from({ length: 100 }).map(() =>
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
  const userIds = users.map((user) => user.id);
  console.log(`Created ${userIds.length} users`);

  // Create posts
  const posts = await Promise.all(
    Array.from({ length: userIds.length / 5 }).map(() =>
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
  const postIds = posts.map((post) => post.id);
  console.log(`Created ${postIds.length} posts`);

  // Create top level comments
  const topLevelComments = await Promise.all(
    Array.from({ length: postIds.length * 10 }).map(() =>
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
  const topLevelCommentIds = topLevelComments.map((comment) => comment.id);
  console.log(`Created ${topLevelCommentIds.length} top level comments`);

  // Create replies
  const replies = await Promise.all(
    Array.from({ length: topLevelCommentIds.length * 30 }).map(() =>
      prisma.comment.create({
        data: {
          message: faker.lorem.paragraph({ min: 1, max: 10 }),
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          postId: postIds[Math.floor(Math.random() * postIds.length)],
          createdAt: faker.date.past(),
          parentId:
            topLevelCommentIds[
              Math.floor(Math.random() * topLevelCommentIds.length)
            ],
        },
      })
    )
  );
  const replyIds = replies.map((reply) => reply.id);
  console.log(`Created ${replyIds.length} replies`);
}

seed();
