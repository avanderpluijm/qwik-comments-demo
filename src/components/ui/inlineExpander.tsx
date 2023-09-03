import { $, component$, useSignal } from "@builder.io/qwik";

// Shared component to expand text within a container
// Used in the post description

export interface InlineExpanderProps {
  content: string;
  length: number;
}

export const InlineExpander = component$<InlineExpanderProps>(
  ({ content, length = 100 }) => {
    // Expandable state
    const expandable = content.length > length;
    // Expanded state
    const expanded = useSignal(false);

    // Toggle expanded state
    const toggle = $(() => (expanded.value = !expanded.value));

    // Render full text when content is not expandable
    if (!expandable)
      return <div class="bg-slate-700 rounded p-2 text-sm">{content}</div>;

    // Render full text when content is expanded
    if (expanded.value) {
      return (
        <div class="bg-slate-700 rounded p-2 text-sm">
          {content}
          <div class="mt-2 text-sm cursor-pointer" onClick$={toggle}>
            Show less
          </div>
        </div>
      );
    }

    // Render truncated text when content is not expanded
    return (
      <div
        onClick$={toggle}
        class={`bg-slate-700 rounded p-2 text-sm ${
          !expanded.value && "hover:bg-slate-500 cursor-pointer"
        }`}
      >
        {content.substring(0, length)}
        <div class="m-1">...more</div>
      </div>
    );
  }
);
