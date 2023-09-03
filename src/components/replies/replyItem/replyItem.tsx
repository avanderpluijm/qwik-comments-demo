import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { Avatar } from "~/components/ui/avatar/avatar";
import { fromNow } from "~/utils/date";

export const ReplyItem = component$((props: { reply: any }) => {
  const { reply } = props;

  return (
    <div class="flex mb-2 gap-4">
      <Link href={`/users/${reply.user.id}`}>
        <Avatar name={reply.user.username} color={reply.user.color} size="lg" />
      </Link>
      <div class="flex-1">
        <div>
          <span class="text-xs font-bold mr-2">
            <Link href={`/users/${reply.user.id}`}>@{reply.user.username}</Link>
          </span>
          <span class="text-xs text-slate-500">{fromNow(reply.createdAt)}</span>
        </div>
        <div class="py-2 text-sm">{reply.message}</div>
      </div>
    </div>
  );
});
