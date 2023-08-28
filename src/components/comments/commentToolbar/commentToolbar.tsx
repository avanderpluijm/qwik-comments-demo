import { $, Slot, component$, useSignal } from "@builder.io/qwik";
import {
  HiHandThumbDownOutline,
  HiHandThumbUpOutline,
} from "@qwikest/icons/heroicons";

import { Button } from "~/components/ui/button/button";

// Create a component that renders a comment toolbar
export const CommentToolbar = component$(() => {
  // Create a signal to track the collapsed state
  const collapsed = useSignal(true);

  // Return a random number between 0 and 100
  const randomVoteCount = $(() =>
    Math.floor(Math.random() * (100 - 0 + 1) + 0)
  );

  // Toggle the collapsed state
  const toggle = $(() => (collapsed.value = !collapsed.value));

  return (
    <>
      <div class="flex flex-row items-center cursor-pointer mt-1 gap-2">
        <div>
          <Button intent="secondary" square={true} padding="tight">
            <HiHandThumbUpOutline />
          </Button>
          <span class="text-sm text-slate-400">{randomVoteCount()}</span>
        </div>
        <div>
          <Button intent="secondary" square={true} padding="tight">
            <HiHandThumbDownOutline />
          </Button>
          <span class="text-sm text-slate-400">{randomVoteCount()}</span>
        </div>
        <Button intent="secondary" clickHandler={toggle}>
          Reply
        </Button>
      </div>
      <section hidden={collapsed.value}>
        <Slot />
      </section>
    </>
  );
});
