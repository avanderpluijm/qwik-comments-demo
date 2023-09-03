import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { CommentItem } from "../commentItem/commentItem";
import {
  useGetPost,
  useInitialCommentsLoader,
} from "~/routes/(app)/posts/[slug]";

// Fetch comments from the server for a given post
export const fetchComments = server$(
  async ({
    postId,
    rangeStart = 0,
    parentId,
    take = 5,
  }: {
    postId: number;
    rangeStart?: number;
    parentId?: number;
    take?: number;
  }) => {
    const prisma = new PrismaClient();
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        where: { postId, parentId: parentId || null },
        include: {
          user: true,
          _count: { select: { replies: {}, likes: {}, dislikes: {} } },
        },
        take,
        orderBy: { createdAt: "desc" },
        skip: rangeStart * take,
      }),
      prisma.comment.count({ where: { postId, parentId: parentId || null } }),
    ]);
    return { pagination: { total: count }, data: comments };
  }
);
export type CommentsResult = Awaited<ReturnType<typeof fetchComments>>;

export const CommentList = component$(() => {
  // post signal from route loader
  const postSignal = useGetPost();
  // initial data from server
  const initialData = useInitialCommentsLoader();
  // Set the current range to 0 (start from the beginning)
  const currentRange = useSignal(0);
  // Data to display. Will be updated when new data is fetched
  const dataToDisplay = useStore<CommentsResult>(
    initialData.value || { pagination: { total: 0 }, data: [] }
  );
  // New data fetched from the server
  const newComments = useSignal<CommentsResult>();
  // If there are no comments, return null
  if (!postSignal.value) return null;

  useTask$(({ track }) => {
    const data = track(() => newComments.value);
    if (!data) return;
    dataToDisplay.pagination.total = data.pagination.total;
    dataToDisplay.data = [...dataToDisplay.data, ...data.data];
  });

  useTask$(async ({ track }) => {
    const newRange = track(() => currentRange.value);
    if (!newRange) return;
    const comments = await fetchComments({
      postId: postSignal.value?.id,
      rangeStart: newRange,
    });
    newComments.value = comments;
  });

  return (
    <>
      <div>
        {dataToDisplay.data?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      {dataToDisplay.data.length < dataToDisplay.pagination.total && (
        <button
          class="bg-transparen b-0 text-white rounded-full cursor-pointer text-sm bg-slate-700 hover:bg-slate-500 font-bold px-4 py-2"
          onClick$={() => (currentRange.value = currentRange.value + 1)}
        >
          Load More (
          {dataToDisplay.pagination.total - dataToDisplay.data.length})
        </button>
      )}
    </>
  );
});
