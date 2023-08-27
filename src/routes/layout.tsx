import { component$, createContextId, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { Header } from '~/components/shared/header/header';

// Context to mimic authorization state
export const CTX = createContextId<{ authenticated: boolean }>('auth');

export default component$(() => {
  const authData = useStore({ authenticated: true });
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
