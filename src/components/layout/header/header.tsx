import { component$ } from "@builder.io/qwik";
import { UserMenu } from "./user-menu";
// import { HiBars3Solid } from "@qwikest/icons/heroicons";
import { Link } from "@builder.io/qwik-city";

export const Header = component$(() => {
  return (
    <header class="bg-slate-800 px-2 mt-0 fixed w-full z-10 pin-t h-16">
      <div class="flex justify-between items-center h-full">
        <div class="font-black p-2 flex gap-1">
          {/* <HiBars3Solid class="inline mr-4" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="mt-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z" />
          </svg>
          <Link href="/">QwikTube</Link>
        </div>
        <div class="p-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
});
