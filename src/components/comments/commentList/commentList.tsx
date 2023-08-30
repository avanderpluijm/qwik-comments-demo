import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { CommentForm } from "~/components/comments/commentForm/commentForm";
import { CommentToolbar } from "~/components/comments/commentToolbar/commentToolbar";
import { Avatar } from "~/components/ui/avatar/avatar";
import { Button } from "~/components/ui/button/button";
import { commentContext } from "~/routes/posts/[slug]";
import { fromNow } from "~/utils/date";

export const CommentList = component$(() => {
  const comments = useContext(commentContext);

  return (
    <>
      <div class="my-4">
        {comments.comments.map((comment: any, index: number) => (
          <div key={index} class="flex mb-2 gap-4">
            <Link href={`/users/${comment.user.id}`}>
              <Avatar
                name={comment.user.username}
                color={comment.user.color}
                size="lg"
              />
            </Link>
            <div class="flex-1">
              <div>
                <span class="text-xs font-bold mr-2">
                  <Link href={`/users/${comment.user.id}`}>
                    @{comment.user.username}
                  </Link>
                </span>
                <span class="text-xs text-slate-500">
                  {fromNow(comment.createdAt)}
                </span>
              </div>
              <div class="py-2 text-sm">{comment.message}</div>

              <CommentToolbar>
                <CommentForm reply={true} />
              </CommentToolbar>

              {comment._count?.children > 0 && (
                <div class="expander-wrapper">
                  <div class="expander-header text-blue-500 font-semibold text-sm p-2 cursor-pointer hover:bg-slate-700 inline-block rounded-xl my-1">
                    <span class="expander-button mr-2">&#9207;</span>
                    {comment._count.children}{" "}
                    {comment._count.children > 1 ? "replies" : "reply"}
                  </div>
                  <div class="expander-content"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {comments.comments.length < comments.commentCount && (
        <Button intent="secondary">Load more comments</Button>
      )}
    </>
  );
});
