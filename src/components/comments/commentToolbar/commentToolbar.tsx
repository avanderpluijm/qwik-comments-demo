import { $, Slot, component$, useSignal } from "@builder.io/qwik";
import {
  HiHandThumbDownOutline,
  HiHandThumbUpOutline,
} from "@qwikest/icons/heroicons";

import styles from "./commentToolbar.module.css";

// Create a component that renders a comment toolbar
export const CommentToolbar = component$(() => {
  // Create a signal to track the collapsed state
  const collapsed = useSignal(true);

  // Return a random number between 0 and 100
  const randomVoteCount = Math.floor(Math.random() * (100 - 0 + 1) + 0);

  // Toggle the collapsed state
  const toggle = $(() => (collapsed.value = !collapsed.value));

  return (
    <div>
      <div class={styles["toolbar"]}>
        <div class="w-12">
          <HiHandThumbUpOutline class="inline" />
          <span class="text-sm text-slate-400 ml-1">{randomVoteCount}</span>
        </div>
        <div class="w-12">
          <HiHandThumbDownOutline class="inline" />
          <span class="text-sm text-slate-400 ml-1">{randomVoteCount}</span>
        </div>
        <div class={styles["reply"]} onclick$={toggle}>
          Reply
        </div>
      </div>
      <section hidden={collapsed.value}>
        <Slot />
      </section>
    </div>
  );
});
