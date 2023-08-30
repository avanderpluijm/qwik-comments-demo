import { component$ } from "@builder.io/qwik";
import {
  HiHandThumbDownOutline,
  HiHandThumbUpOutline,
} from "@qwikest/icons/heroicons";

import { Avatar } from "~/components/ui/avatar/avatar";
import { Button } from "~/components/ui/button/button";
import { useGetPost } from "~/routes/posts/[slug]";

export const PublisherToolbar = component$(() => {
  const post = useGetPost();

  return (
    <div class="flex items-center mb-4 gap-4 justify-between">
      <div class="flex gap-2">
        <Avatar
          name={post.value?.user.username || "NN"}
          color={post.value?.user.color || "#FFF"}
          size="lg"
        />
        <div>
          <h3 class="font-bolder">{post.value?.user.username}</h3>
          {/* TODO: add publisher subscribers count */}
          <div class="text-sm text-slate-400">878 subscribers</div>
        </div>
      </div>
      <div>
        {/* TODO: add publisher subscribe action */}
        <Button intent="secondary">Subscribe</Button>
      </div>
      <div>
        <Button intent="secondary">
          <HiHandThumbDownOutline class="inline m-2" />
          {/* TODO: add publisher likes */}
          <span class="text-sm text-slate-400">120</span>
          {/* TODO: add publisher dislikes */}
          <HiHandThumbUpOutline class="inline m-2" />
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
