import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { TextInput } from "~/components/ui/textInput";
import { Button } from "~/components/ui/button";
import { handleSignup } from "~/utils/auth";
import { Alert } from "~/components/ui/alert";
import { ThermIcon } from "~/components/ui/icons/therm";

export const useSignup = routeAction$(
  async (formData, requestEvent) => {
    return handleSignup(formData, requestEvent);
  },
  zod$({
    email: z
      .string()
      .nonempty("Enter value for email field")
      .email("Enter valid email address"),
    username: z.string().nonempty("Enter value for username field"),
    password: z.string().nonempty("Enter value for password field"),
  })
);
export default component$(() => {
  const actionSig = useSignup();
  return (
    <div class="min-h-screen grid place-items-center">
      <article class="card card-bordered shadow max-w-md mx-auto w-full">
        <div class="card-body">
          <div class="mb-6 flex flex-col items-center gap-4">
            <Link href="/">
              <ThermIcon />
            </Link>
            <h2 class="text-3xl font-bold text-center">Join today</h2>
          </div>
          {actionSig.value?.error && (
            <Alert text={actionSig.value.error} status="alert-error" />
          )}
          <Form action={actionSig}>
            <TextInput
              type="email"
              label="Email"
              id="email"
              name="email"
              error={actionSig.value?.fieldErrors?.email?.[0]}
              value={actionSig.formData?.get("email") ?? ""}
            />
            <TextInput
              label="Username"
              id="username"
              name="username"
              error={actionSig.value?.fieldErrors?.username?.[0]}
              value={actionSig.formData?.get("username") ?? ""}
            />
            <TextInput
              type="password"
              label="Password"
              id="password"
              name="password"
              error={actionSig.value?.fieldErrors?.password?.[0]}
            />
            <div class="mt-4">
              <Button
                loading={actionSig.isRunning}
                colorScheme="btn-primary"
                fullWidth
              >
                Sign up
              </Button>
            </div>
          </Form>

          <div class="mt-4 text-center">
            <span class="opacity-80">Already have an account? </span>
            <Link class="link font-medium opacity-100" href="/login">
              Log in
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
});
