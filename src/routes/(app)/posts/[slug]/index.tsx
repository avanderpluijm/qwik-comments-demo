import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

import { Sidebar } from "~/components/layout/sidebar/sidebar";
import { RelatedPanel } from "~/components/related/relatedPanel/relatedPanel";
import { PostPanel } from "~/components/post/postPanel/postPanel";
import { fetchComments } from "~/components/comments/commentList/commentList";
import { getPostBySlug, getRandomPosts } from "~/services/post";
import { handleCreateComment } from "~/services/comment";

export const useGetRandomPosts = routeLoader$(async () => getRandomPosts(10));

export const useGetPost = routeLoader$(
  async ({ params }) => await getPostBySlug(params["slug"])
);

export type Post = Awaited<ReturnType<typeof useGetPost>>;

export const useCreateComment = routeAction$(
  async (formData, requestEvent) => {
    console.log("useCreateComment", formData);
    return handleCreateComment(
      { ...formData, postId: +formData.postId },
      requestEvent
    );
  },
  zod$({
    message: z.string().nonempty("Enter value for reply field"),
    postId: z.string().nonempty(),
  })
);

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
