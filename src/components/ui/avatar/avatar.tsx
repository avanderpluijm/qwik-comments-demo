import { component$ } from "@builder.io/qwik";

export interface AvatarProps {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// TODO: Dynamic color is not applied after rendering
export const Avatar = component$<AvatarProps>((props) => {
  const { name, color, size = "md" } = props;

  const classNames = [
    "rounded-full aspect-square font-bold flex justify-center items-center",
  ];
  switch (size) {
    case "sm":
      classNames.push("text-xs w-2");
      break;
    case "md":
      classNames.push("text-sm w-6");
      break;
    case "lg":
      classNames.push("text-base w-8");
      break;
    case "xl":
      classNames.push("text-lg w-16");
      break;
    default:
      classNames.push("text-sm w-4");
  }

  return (
    <div class={classNames} style={{ backgroundColor: color }}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
});
