import { component$ } from "@builder.io/qwik";

export interface AvatarProps {
  name: string;
  color: string;
  size?: 12;
}

// TODO: Dynamic color is not applied after rendering
export const Avatar = component$<AvatarProps>(({ name, color, size = 12 }) => {
  return (
    <div
      class={`bg-blue-700 rounded-full w-${size} aspect-square font-bold text-xl mr-4 bg-${color} flex justify-center items-center`}
    >
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
});
