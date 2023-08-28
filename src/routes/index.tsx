import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

import { CommentPanel } from "~/components/comments/commentPanel/commentPanel";
import { InlineExpander } from "~/components/ui/inlineExpander/inlineExpander";
import { Sidebar } from "~/components/layout/sidebar/sidebar";
import { Avatar } from "~/components/ui/avatar/avatar";
import { Button } from "~/components/ui/button/button";
import {
  HiHandThumbDownOutline,
  HiHandThumbUpOutline,
} from "@qwikest/icons/heroicons";

export const useGetPost = routeLoader$(async ({ status }) => {
  // const postId = parseInt(params['postId'], 1);
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst();
  if (!post) status(404);
  return post;
});

export const useComments = routeLoader$(async ({ status }) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst();
  if (!post) status(404);

  return await prisma.comment.findMany({
    where: { postId: post?.id || 1, parentId: null },
    include: { _count: { select: { children: {} } }, user: true },
  });
});

// Comment Form submit action
export const useAddComment = routeAction$((data) => {
  // This will only run on the server when the user submits the form (or when the action is called programmatically)
  console.log("useAddComment routeaction", data);
  return {
    success: true,
    commentId: 1234,
  };
}, zod$({ comment: z.string() }));

export default component$(() => {
  const post = useGetPost();

  return (
    <section class="md:grid md:grid-cols-12 gap-4">
      <main class="md:col-span-8">
        <video src="./preview.mp4" controls={true} autoPlay muted loop />
        <h1 class="text-lg font-bold py-2">{post.value?.title}</h1>
        <div class="flex items-center mb-4 gap-4 flex-1">
          <div>
            <Avatar name="Jake" color="yello-200" />
          </div>
          <div>
            <h3 class="font-bolder">Jake the publisher</h3>
            <div class="text-sm text-slate-400">878 subscribers</div>
          </div>
          <div>
            <Button intent="secondary">Subscribe</Button>
          </div>
          <div>
            <Button intent="secondary">
              <HiHandThumbDownOutline class="inline m-2" />
              <span class="text-sm text-slate-400">120</span>
              <HiHandThumbUpOutline class="inline m-2" />
              <span class="text-sm text-slate-400">72</span>
            </Button>
          </div>
          <div>
            <Button>Share</Button>
          </div>
        </div>
        <InlineExpander content={post.value?.description || ""} length={150} />
        <CommentPanel />
      </main>
      <Sidebar />
    </section>
  );
});

export const head: DocumentHead = {
  title: "Comments with Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
