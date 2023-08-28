import { component$, createContextId, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PrismaClient, User } from '@prisma/client';
import { Header } from '~/components/layout/header/header';

export const useGetCurrentUser = routeLoader$(async () => {
  const prisma = new PrismaClient();
  return await prisma.user.findFirst();
})

// Context to mimic authorization state
export const CTX = createContextId<{ authenticated: boolean, user?: User }>('auth');

export default component$(() => {
  const user = useGetCurrentUser(); 

  const authData = useStore({ authenticated: user.value?.username != undefined || false, user: user.value || undefined });
  useContextProvider(CTX, authData); 
  
  return (
    <>
      <Header />
      <main class="py-16 px-2">
        <Slot />
      </main>
    </>
  );
});
