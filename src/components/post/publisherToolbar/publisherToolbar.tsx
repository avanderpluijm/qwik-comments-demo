import { component$ } from "@builder.io/qwik";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThumbDownIcon, ThumbUpIcon } from "~/components/ui/icons/thumb";
import { useGetPost } from "~/routes//(app)/posts/[slug]";

export const PublisherToolbar = component$(() => {
  const post = useGetPost();

  return (
    <div class="flex items-center mb-4 gap-4 justify-between">
      <div class="flex gap-2">
        <Avatar src={post.value?.user.avatar || ""} size="lg" />
        <div>
          <h3 class="font-bolder">{post.value?.user.username}</h3>
          {/* TODO: add publisher subscribers count */}
          <div class="text-sm text-slate-400">878 subscribers</div>
        </div>
      </div>
      <div>
        {/* TODO: add publisher subscribe action */}
        <Button>Subscribe</Button>
      </div>
      <div>
        <Button>
          <ThumbUpIcon />

          <span class="text-sm text-slate-400">120</span>

          <ThumbDownIcon />
          <span class="text-sm text-slate-400">72</span>
        </Button>
      </div>
      <div>
        {/* TODO: add share buttons */}
        <Button>Share</Button>
      </div>
    </div>
  );
});
