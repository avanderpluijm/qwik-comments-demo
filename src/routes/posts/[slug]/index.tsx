import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

import { Sidebar } from "~/components/layout/sidebar/sidebar";
import { RelatedPanel } from "~/components/related/relatedPanel/relatedPanel";
import { PostPanel } from "~/components/post/postPanel/postPanel";
import { fetchComments } from "~/components/comments/commentList/commentList";

export const useGetRandomPosts = routeLoader$(async () => {
  const count = 10;
  const prisma = new PrismaClient();
  const itemCount = await prisma.post.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - count);

  return await prisma.post.findMany({
    include: {
      _count: { select: { comments: { where: { parent: null } } } },
      user: true,
    },
    take: count,
    skip,
  });
});

export const useGetPost = routeLoader$(async ({ params, status }) => {
  const slug = params["slug"];
  const prisma = new PrismaClient();

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      _count: { select: { comments: { where: { parent: null } } } },
      user: true,
    },
  });
  if (!post) status(404);

  return post;
});

export type Post = Awaited<ReturnType<typeof useGetPost>>;

export const useInitialCommentsLoader = routeLoader$(
  async ({ params, status }) => {
    const prisma = new PrismaClient();
    const post = await prisma.post.findFirst({
      where: { slug: params["slug"] },
    });
    if (!post) {
      status(404);
      return null;
    }
    return await fetchComments({ postId: post.id });
  }
);

export default component$(() => (
  <section class="md:grid md:grid-cols-12 gap-4">
    <main class="md:col-span-8">
      <PostPanel />
    </main>

    <Sidebar>
      <RelatedPanel />
    </Sidebar>
  </section>
));

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(useGetPost);
  return {
    title: post?.title || "Video post",
    meta: [
      {
        name: "description",
        content: post?.description?.substring(0, 255) || "Video post",
      },
    ],
  };
};
