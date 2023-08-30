import { component$, useStore } from "@builder.io/qwik";
import { Link, server$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

import { CommentForm } from "~/components/comments/commentForm/commentForm";
import { CommentToolbar } from "~/components/comments/commentToolbar/commentToolbar";
import { Avatar } from "~/components/ui/avatar/avatar";
import { useComments, useGetPost } from "~/routes/posts/[slug]";
import { fromNow } from "~/utils/date";

// Fetch comments from the server for a given post
const fetchComments = server$(
  async (postId: number, skip: number, take = 5, parentId?: number) => {
    const prisma = new PrismaClient();
    return await prisma.comment.findMany({
      where: { postId, parentId },
      include: { _count: { select: { children: {} } }, user: true },
      take,
      skip,
    });
  }
);

export const CommentList = component$(() => {
  const post = useGetPost();
  const initialComments = useComments();
  const commentStore: any = useStore(initialComments.value || {});

  return (
    <>
      <div class="my-4">
        {commentStore.comments.map((comment: any, index: number) => (
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
      {(commentStore.comments?.length || 0) <
        (commentStore.commentCount || 0) && (
        <button
          onClick$={async () => {
            if (!post.value) return;
            const skip = (commentStore.comments?.length || 0) + 1;
            const newComments: any = await fetchComments(post.value?.id, skip);
            commentStore.comments.push(...newComments);
          }}
        >
          Load more comments
        </button>
      )}
    </>
  );
});
