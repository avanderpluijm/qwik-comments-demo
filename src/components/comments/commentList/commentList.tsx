import { component$ } from "@builder.io/qwik";
import { useComments } from "~/routes/index";
import { CommentForm } from "~/components/comments/commentForm/commentForm";
import { CommentToolbar } from "~/components/comments/commentToolbar/commentToolbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const CommentList = component$(() => {
  const comments = useComments();

  return (
    <div class="my-4">
      {comments.value?.map((comment, index) => (
        <div key={index} class="flex mb-2">
          {/* TODO: Dynamic color is not applied after rendering */}
          <div
            class={` bg-blue-700 rounded-full w-10 h-10 text-center leading-10 font-bold text-xl mr-4 bg-${comment.user.color}`}
          >
            {comment.user.name.substring(0, 2).toUpperCase()}
          </div>
          <div class="flex-1">
            <div>
              <span class="text-xs font-bold mr-2">@{comment.user.name}</span>
              <span class="text-xs text-slate-500">
                {dayjs(comment.createdAt).fromNow()}
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
  );
});
