import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { UserMenu } from "~/components/layout/header/user-menu";
import { ThermIcon } from "~/components/ui/icons/therm";
import { BarsIcon } from "~/components/ui/icons/bars";

export const Header = component$(() => {
  return (
    <header class="bg-slate-800 px-2 mt-0 fixed w-full z-10 pin-t h-16">
      <div class="flex justify-between items-center h-full">
        <div class="font-black p-2 flex gap-1">
          <BarsIcon />
          <ThermIcon />
          <Link href="/">QwikTube</Link>
        </div>
        <div class="p-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
});
