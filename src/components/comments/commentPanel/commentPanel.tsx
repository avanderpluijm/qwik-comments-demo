import { component$ } from "@builder.io/qwik"
import { CommentForm } from "../commentForm/commentForm"
import { CommentList } from "../commentList/commentList"
import { useComments } from "~/routes/posts/[slug]"

export const CommentPanel = component$(() => {
  const comments = useComments()
  
  return (
    <section class="">
      <h2 class=" text-base py-4 text-slate-50">{comments.value?.length} Comments</h2>

      <CommentForm />
      <CommentList />
    </section>
  )
})
        