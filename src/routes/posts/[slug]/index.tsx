import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
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

export const useComments = routeLoader$(async ({ status }) => {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst();
  if (!post) status(404);
  if (!post) return null;

  return await prisma.comment.findMany({
    where: { postId: post.id, parentId: null },
    include: { _count: { select: { children: {} } }, user: true },
  });
});

export default component$(() => {
  const post = useGetPost();

  if (!post.value) return null;

  return (
    <section class="md:grid md:grid-cols-12 gap-4">
      <main class="md:col-span-8">
        <video
          class="ratio-16/9"
          src="/preview.mp4"
          placeholder={post.value?.thumbnail}
          controls={true}
          autoPlay
          muted
          loop
        />
        <h1 class="text-lg font-bold py-2">{post.value?.title}</h1>
        <div class="flex items-center mb-4 gap-4 flex-1">
          <div>
            <Avatar name={post.value?.user.username} color="yello-200" />
          </div>
          <div>
            <h3 class="font-bolder">{post.value?.user.username}</h3>
            {/* TODO: add publisher subscribers count */}
            <div class="text-sm text-slate-400">878 subscribers</div>
          </div>
          <div>
            {/* TODO: add publisher subscribe action */}
            <Button intent="secondary">Subscribe</Button>
          </div>
          <div>
            <Button intent="secondary">
              <HiHandThumbDownOutline class="inline m-2" />
              {/* TODO: add publisher likes */}
              <span class="text-sm text-slate-400">120</span>
              {/* TODO: add publisher dislikes */}
              <HiHandThumbUpOutline class="inline m-2" />
              <span class="text-sm text-slate-400">72</span>
            </Button>
          </div>
          <div>
            {/* TODO: add share buttons */}
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
