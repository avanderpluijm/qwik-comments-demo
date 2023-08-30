import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

import { CommentPanel } from "~/components/comments/commentPanel/commentPanel";
import { InlineExpander } from "~/components/ui/inlineExpander/inlineExpander";
import { Sidebar } from "~/components/layout/sidebar/sidebar";
import { RelatedPanel } from "~/components/related/relatedPanel/relatedPanel";
import { PublisherToolbar } from "~/components/post/publisherToolbar/publisherToolbar";
import { Video } from "~/components/ui/video/video";

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
      // Select the first level of comments
      _count: { select: { comments: { where: { parent: null } } } },
      user: true,
    },
  });
  if (!post) status(404);

  return post;
});

export const useComments = routeLoader$(async ({ params, status }) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst({ where: { slug: params["slug"] } });
  if (!post) status(404);
  if (!post) return null;

  const commentCount = await prisma.comment.count({
    where: { postId: post.id, parentId: null },
  });
  const comments = await prisma.comment.findMany({
    where: { postId: post.id, parentId: null },
    include: { _count: { select: { children: {} } }, user: true },
    take: 5,
  });

  return { commentCount, comments };
});

export const commentContext = createContextId<any>("comments");

export default component$(() => {
  const post = useGetPost();
  // Get the server side comments
  const comments = useComments();
  // Create a store for the comments
  const commentStore = useStore(comments.value || {});

  // Create a context provider for the comments
  useContextProvider(commentContext, commentStore);

  if (!post.value) return null;

  return (
    <section class="md:grid md:grid-cols-12 gap-4">
      <main class="md:col-span-8">
        <Video post={post} />

        <h1>{post.value?.title}</h1>

        <PublisherToolbar />
        <InlineExpander content={post.value?.description || ""} length={150} />
        <CommentPanel />
      </main>

      <Sidebar>
        <RelatedPanel />
      </Sidebar>
    </section>
  );
});

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
