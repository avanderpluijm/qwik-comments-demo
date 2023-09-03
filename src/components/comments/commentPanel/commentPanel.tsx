import { component$ } from "@builder.io/qwik";
import { CommentForm } from "../commentForm/commentForm";
import { CommentList } from "../commentList/commentList";
import { useGetPost } from "~/routes/(app)/posts/[slug]";

export const CommentPanel = component$(() => {
  const postSignal = useGetPost();

  return (
    <section class="">
      <h2 class=" text-base py-4 text-slate-50">
        {postSignal.value?._count.comments} Comments
      </h2>
      <CommentForm />
      <CommentList />
    </section>
  );
});
