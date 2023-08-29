import { $, component$, useContext } from "@builder.io/qwik";
import { Avatar } from "~/components/ui/avatar/avatar";

import { CTX } from "~/routes/layout";

export const UserMenu = component$(() => {
  // Get user data from top level context, mimicking authentication state.
  const userData = useContext(CTX);

  // Toggle authentication state, mimicking login/logout.
  const toggle = $(() => {
    userData.authenticated = !userData.authenticated;
    userData.user = undefined;
  });

  // Render a button that toggles the authentication state.
  return (
    <div class="flex gap-4 items-center justify-center">
      {userData.user && (
        <div class="flex gap-2 justify-center h-full items-center">
          <Avatar
            name={userData.user.username}
            color={userData.user.color}
            size="md"
          />
          <span class="text-sm">{userData.user.username}</span>
        </div>
      )}
      <button onClick$={toggle} class="hover:bg-slate-600 py-2 px-4 rounded">
        {userData.authenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
});
