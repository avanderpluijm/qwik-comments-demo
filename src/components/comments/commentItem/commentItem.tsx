import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { Avatar } from "~/components/ui/avatar/avatar";
import { fromNow } from "~/utils/date";
import { CommentToolbar } from "~/components/comments/commentToolbar/commentToolbar";
import { CommentForm } from "~/components/comments/commentForm/commentForm";
import { ReplyList } from "~/components/replies/replyList/replyList";

interface Props {
  comment: any;
}

export const CommentItem = component$<Props>((props) => {
  const { comment } = props;

  return (
    <div class="flex mb-2 gap-4">
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

        <CommentToolbar
          likes={comment._count.likes}
          dislikes={comment._count.dislikes}
        >
          <CommentForm reply={true} />
        </CommentToolbar>

        <ReplyList comment={comment} />
      </div>
    </div>
  );
});
