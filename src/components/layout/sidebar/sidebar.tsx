import { Slot, component$ } from "@builder.io/qwik";

export const Sidebar = component$(() => {
  return (
    <div class="col-span-4">
      <Slot />
    </div>
  );
});
