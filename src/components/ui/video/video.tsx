import { component$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

interface Props {
  post?: Signal;
}
export const Video = component$<Props>((props) => {
  if (!props.post?.value?.thumbnail) return null;
  return (
    <div class="relative">
      <img
        src={props.post?.value?.thumbnail}
        class="overflow-hidden aspect-video rounded-xl w-full"
        width={800}
        height={450}
      />
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          class="w-24 h-24 fill-slate-700 stroke-slate-200 hover:stroke-slate-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
      </div>
    </div>
  );
});
