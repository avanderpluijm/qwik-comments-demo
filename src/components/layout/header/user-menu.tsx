import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import { useCurrentUser, useLogout } from "~/routes/(app)/layout";

export const UserMenu = component$(() => {
  const userSig = useCurrentUser();
  const logoutSig = useLogout();

  return (
    <div class="flex gap-4 items-center justify-center">
      {userSig.value && (
        <div class="flex gap-2 justify-center h-full items-center">
          <Avatar src={userSig.value.avatar} size="md" />
          <span class="text-sm">{userSig.value.username}</span>
        </div>
      )}
      {userSig.value?.id && (
        <Form action={logoutSig}>
          <Button
            type="submit"
            loading={logoutSig.isRunning}
            colorScheme="btn-ghost"
          >
            Logout
          </Button>
        </Form>
      )}

      {!userSig.value?.id && <Link href="/login">Login</Link>}
    </div>
  );
});
