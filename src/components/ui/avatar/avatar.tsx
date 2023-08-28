import { component$ } from "@builder.io/qwik";

export interface AvatarProps {
  name: string;
  color: string;
  size?: 4 | 12;
}

// TODO: Dynamic color is not applied after rendering
export const Avatar = component$<AvatarProps>((props) => {
  const { name, color, size = 12 } = props;

  const classNames = [
    "rounded-full aspect-square font-bold text-xl mr-4 flex justify-center items-center",
  ];
  classNames.push(`w-${size}`);

  return (
    <div class={classNames} style={{ backgroundColor: color }}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
});
