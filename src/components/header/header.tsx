import { component$ } from "@builder.io/qwik";
import { UserMenu } from "./user-menu";
import { HiBars3Solid } from "@qwikest/icons/heroicons";

export const Header = component$(() => {

  return(
    <header class="bg-slate-800 p-2 mt-0 fixed w-full z-10 pin-t h-16">
      <div class="flex justify-between items-center">
        <div class="font-black p-2">
        <HiBars3Solid class="inline mr-4" />QwikTube
        </div>
        <div class="p-2"><UserMenu /></div>
      </div>
    </header>
  )
})