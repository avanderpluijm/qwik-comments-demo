import { component$ } from "@builder.io/qwik";

export interface AvatarProps {
  name: string;
  color: string;
  size?: 12;
}

// TODO: Dynamic color is not applied after rendering
export const Avatar = component$<AvatarProps>((props) => {
  const { name, color, size = 12 } = props;

  const classNames = [
    "bg-blue-700 rounded-full w-12 aspect-square font-bold text-xl mr-4 flex justify-center items-center",
  ];
  classNames.push(`w-${size}`);
  classNames.push(`bg-${color}`);

  return <div class={classNames}>{name.substring(0, 2).toUpperCase()}</div>;
});
