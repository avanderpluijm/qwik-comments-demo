import { component$, createContextId, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { Header } from '~/components/header/header';


export const CTX = createContextId<{ authenticated: boolean }>('auth');


export default component$(() => {
  const authData = useStore({ authenticated: true });
  useContextProvider(CTX, authData); 
  
  return (
    <>
      <Header />
      <main class="pt-16">
        <Slot />
      </main>
      {/* <Footer /> */}
    </>
  );
});
