import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create a user
  const kyle = await prisma.user.create({
    data: { name: "kyle", color: "lime-400" },
  });
  const sally = await prisma.user.create({
    data: { name: "sally", color: "orange-400" },
  });
  const bob = await prisma.user.create({
    data: { name: "bob", color: "blue-400" },
  });

  // Create post
  const post1 = await prisma.post.create({
    data: {
      title: "Building a YouTube clone with Qwik",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.",
      userId: kyle.id,
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message:
        "I think now qwik might be a better option. Because react seems to go into the approach of server rendered html for blog articles. Qwik might become the new reactjs or even better.",
      userId: kyle.id,
      postId: post1.id,
      createdAt: new Date("2021-01-01"),
    },
  });

  await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message:
        "Did you need to do anything different with your panda-css config to get both Qwikify Components and native Qwik to work? Or just add it by doing yarn qwik add pandacss?",
      userId: sally.id,
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      message: "I am another root comment",
      userId: bob.id,
      postId: post1.id,
    },
  });
}

seed();
