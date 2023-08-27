import { component$ } from "@builder.io/qwik";

export interface AvatarProps {
  name: string;
  color: string;
  size: 10;
}

// TODO: Dynamic color is not applied after rendering
export const Avatar = component$<AvatarProps>(({ name, color, size = 10 }) => {
  return (
    <div
      class={` bg-blue-700 rounded-full w-${size} h-${size} text-center leading-${size} font-bold text-xl mr-4 bg-${color}`}
    >
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
});
