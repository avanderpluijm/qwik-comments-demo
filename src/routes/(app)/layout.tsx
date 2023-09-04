import { component$, Slot } from "@builder.io/qwik";
import { globalAction$, routeLoader$ } from "@builder.io/qwik-city";
import { Header } from "~/components/layout/header/header";
import { type AuthUser } from "~/types/user";
import { handleLogout } from "~/utils/auth";

export const useCurrentUser = routeLoader$(
  ({ sharedMap }) => sharedMap.get("user") as AuthUser | undefined
);

export const useLogout = globalAction$(
  async (_, requestEvent) => await handleLogout(requestEvent)
);

export default component$(() => {
  return (
    <>
      <Header />
      <main class="py-16 px-2">
        <Slot />
      </main>
    </>
  );
});
