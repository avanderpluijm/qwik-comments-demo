import { component$, useContext } from "@builder.io/qwik";
import { CommentForm } from "../commentForm/commentForm";
import { CommentList } from "../commentList/commentList";
import { commentContext } from "~/routes/posts/[slug]";

export const CommentPanel = component$(() => {
  const commentCtx = useContext(commentContext);

  return (
    <section class="">
      <h2 class=" text-base py-4 text-slate-50">
        {commentCtx.length} Comments
      </h2>
      <CommentForm />
      <CommentList />
    </section>
  );
});
