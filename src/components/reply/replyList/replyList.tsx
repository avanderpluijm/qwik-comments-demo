import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { ReplyItem } from "../replyItem/replyItem";
import type { CommentsResult } from "~/components/comments/commentList/commentList";
import { fetchComments } from "~/components/comments/commentList/commentList";

interface Props {
  comment: any;
}

export const ReplyList = component$<Props>((props) => {
  const { comment } = props;
  const expanded = useSignal(false);
  const currentRange = useSignal(0);
  const dataToDisplay = useStore<CommentsResult>({
    pagination: { total: 0 },
    data: [],
  });
  const newData = useSignal<CommentsResult>();

  if (comment._count?.replies < 1) return null;

  // Add new replies to the list
  // when they are added to the newData signal
  useTask$(async ({ track }) => {
    const data = track(() => newData.value);
    if (!data) return;
    dataToDisplay.pagination.total = data.pagination.total;
    dataToDisplay.data = [...dataToDisplay.data, ...data.data];
  });

  // Fetch replies from the server
  // when the range changes
  useTask$(async ({ track }) => {
    const newRange = track(() => currentRange.value);
    if (!newRange) return;
    const replies = await fetchComments({
      postId: comment.postId,
      parentId: comment.id,
      rangeStart: newRange,
    });
    newData.value = replies;
  });

  return (
    <div class="expander-wrapper">
      <div
        class="expander-header text-blue-500 font-semibold text-sm p-2 cursor-pointer hover:bg-slate-700 inline-block rounded-xl my-1"
        onClick$={() => {
          if (!currentRange.value) {
            currentRange.value = 1;
          }
          expanded.value = !expanded.value;
        }}
      >
        <span class="expander-button mr-2">
          {expanded.value ? <span>&#9206;</span> : <span>&#9207;</span>}
        </span>
        {comment._count.replies}{" "}
        {comment._count.replies > 1 ? "replies" : "reply"}
      </div>

      {/* Expander content */}
      <div class={expanded.value ? "block" : "hidden"}>
        {/* Replies */}
        {dataToDisplay.data.map((reply: any) => (
          <ReplyItem key={reply.id} reply={reply} />
        ))}
        {dataToDisplay.data.length < dataToDisplay.pagination.total && (
          <button
            class="bg-transparen b-0 text-white rounded-full cursor-pointer text-sm bg-slate-700 hover:bg-slate-500 font-bold px-4 py-2"
            onClick$={() => (currentRange.value = currentRange.value++)}
          >
            Load More(
            {dataToDisplay.pagination.total - dataToDisplay.data.length})
          </button>
        )}
      </div>
    </div>
  );
});
