import { QRL, Slot, component$ } from "@builder.io/qwik";

export interface ButtonProps {
  type?: "button" | "reset" | "submit";
  intent?: "primary" | "secondary";
  square?: boolean;
  padding?: "tight" | "normal";
  clickHandler?: QRL<() => boolean>;
}

export const Button = component$<ButtonProps>((props) => {
  const {
    type = "button",
    intent = "primary",
    padding = "normal",
    clickHandler,
  } = props;

  const classNames = [
    "bg-transparen",
    "b-0",
    "text-white",
    "rounded-full",
    "cursor-pointer",
    "text-sm",
  ];
  if (intent === "primary") {
    classNames.push("bg-blue-600", "hover:bg-blue-700", "font-bold");
  } else if (intent === "secondary") {
    classNames.push("hover:bg-slate-600");
  }
  if (props.square) {
    classNames.push("rounded-full aspect-square");
  }
  padding === "tight" && classNames.push("px-2 py-1");
  padding === "normal" && classNames.push("px-4 py-2");

  return (
    <button type={type} class={classNames} onclick$={clickHandler}>
      <Slot />
    </button>
  );
});
