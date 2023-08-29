import { component$ } from "@builder.io/qwik";
import { UserMenu } from "./user-menu";
import { HiBars3Solid } from "@qwikest/icons/heroicons";
import { Link } from "@builder.io/qwik-city";

export const Header = component$(() => {
  return (
    <header class="bg-slate-800 px-2 mt-0 fixed w-full z-10 pin-t h-16">
      <div class="flex justify-between items-center h-full">
        <div class="font-black p-2">
          <HiBars3Solid class="inline mr-4" />
          <Link href="/">QwikTube</Link>
        </div>
        <div class="p-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
});
