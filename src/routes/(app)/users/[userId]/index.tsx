import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const userId = parseInt(params["userId"], 10);
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      comments: {
        where: { parent: null },
        include: { post: { select: { id: true, slug: true, title: true } } },
      },
      posts: { select: { id: true, slug: true, title: true } },
    },
  });
  if (!user) status(404);

  return user;
});

export default component$(() => {
  const user = useGetUser();
  if (!user.value) return null;
  return (
    <section>
      <h1 class="font-bold text-xl mb-4">User detail</h1>
      <div>
        <p>Name: {user.value.username}</p>
        <p>Email: {user.value.email}</p>
      </div>
      <div>
        <h2 class="font-bold text-lg mb-2">Posts</h2>
        {user.value.posts.length === 0 && <div>No posts</div>}
        {user.value.posts.map((post) => (
          <div key={post.id}>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </div>
        ))}
      </div>
      <div>
        <h2 class="font-bold text-lg mb-2">Comments</h2>
        {user.value.comments.length === 0 && <div>No comments</div>}
        {user.value.comments.map((comment) => (
          <div key={comment.id}>
            <a href={`/posts/${comment.post.slug}`}>
              {comment.id} on post <strong>{comment.post.title}</strong>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
});
