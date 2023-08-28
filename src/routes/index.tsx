import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetPosts = routeLoader$(async ({ status }) => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: {
      _count: { select: { comments: { where: { parent: null } } } },
      user: true,
    },
  });
  if (!posts) status(404);
  return posts;
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
  const posts = useGetPosts();

  return (
    <section>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.value?.map((post, index) => (
          <div
            key={index}
            class="rounded-lg overflow-hidden hover:bg-slate-700"
          >
            <a href={`/posts/${post.slug}`}>
              <img src={post.thumbnail} width={400} height={200} />
              <div class="text-sm p-2">{post.title}</div>
              {post._count?.comments}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "QwikTube demo",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
