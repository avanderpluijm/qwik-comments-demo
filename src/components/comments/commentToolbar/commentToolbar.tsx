import { $, Slot, component$, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { ThumbDownIcon, ThumbUpIcon } from "~/components/ui/icons/thumb";

interface CommentToolbarProps {
  likes: number;
  dislikes: number;
}

// Create a component that renders a comment toolbar
export const CommentToolbar = component$<CommentToolbarProps>((props) => {
  // Create a signal to track the collapsed state
  const collapsed = useSignal(true);

  // Toggle the collapsed state
  const toggle = $(() => (collapsed.value = !collapsed.value));

  return (
    <>
      <div class="flex flex-row items-center cursor-pointer mt-1 gap-2">
        <div>
          <ThumbUpIcon />
          <span class="text-sm text-slate-400">{props.likes}</span>
        </div>
        <div>
          <ThumbDownIcon />
          <span class="text-sm text-slate-400">{props.dislikes}</span>
        </div>
        <Button onClick$={toggle}>Reply</Button>
      </div>
      <section hidden={collapsed.value}>
        <Slot />
      </section>
    </>
  );
});
