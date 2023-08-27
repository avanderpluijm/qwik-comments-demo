import { $, component$, useContext } from "@builder.io/qwik";

import { CTX } from "~/routes/layout";

export const UserMenu = component$(()=> {
  // Get user data from top level context, mimicking authentication state. 
  const userData = useContext(CTX);

  // Toggle authentication state, mimicking login/logout.
  const toggle = $(() => userData.authenticated = !userData.authenticated)

  // Render a button that toggles the authentication state.
  return (<button onClick$={toggle} class="hover:bg-slate-600 py-2 px-4 rounded">{userData.authenticated ? "Logout" : "Login"}</button> )  
})