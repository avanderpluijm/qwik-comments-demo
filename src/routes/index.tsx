import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";

import { CommentPanel } from "~/components/comments/commentPanel/commentPanel";
import { comments } from "~/components/comments/Comments";
import { Sidebar } from "~/components/sidebar/sidebar";

import ImgVideoPlaceholder from "~/media/img/video_placeholder.png?jsx";

export const useComments = routeLoader$(() => {
  return comments;
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

export const useAuthenticated = routeLoader$(() => {
  return {
    status: true,
    username: "User 1",
    avatar: "https://api.multiavatar.com/3.svg",
  };
});

export default component$(() => {
  return (
    <section class="md:grid md:grid-cols-12 gap-4">
      <main class="md:col-span-8">
        <ImgVideoPlaceholder class="w-full" />
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
