import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

import { useAddComment } from "~/routes/(app)";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/routes/(app)/layout";

interface CommentProps {
  reply?: boolean;
}

export const CommentForm = component$<CommentProps>((props) => {
  const { reply } = props;
  const userSig = useCurrentUser();

  const action = useAddComment();
  const hasFocus = useSignal(false);

  if (!userSig.value?.id) return <div>Sign in to comment</div>;

  return (
    <section class="flex my-4 gap-4">
      <div>
        <Avatar src={userSig.value?.avatar} size="lg" />
      </div>

      <Form class="mb-2 flex-1 flex flex-col content-end" action={action}>
        <div
          class={`bg-transparent border-b border-slate-700 py-1 text-sm focus:outline-none block w-full overflow-hidden resize-none focus:border-slate-400`}
          role="textbox"
          contentEditable="true"
          data-placeholder={`Add a ${reply ? "reply" : "comment"}...`}
          onFocus$={() => (hasFocus.value = true)}
          onBlur$={() => (hasFocus.value = false)}
        >
          {action.formData?.get("comment")?.toString()}
        </div>

        {hasFocus.value && (
          <div class="text-right mt-2">
            <div class="flex content-end gap-1">
              <Button type="reset">Cancel</Button>
              <Button type="submit">{reply ? "Reply" : "Comment"}</Button>
            </div>
            {action.value?.success && <div>Success!</div>}
            {action.value?.failed && <p>{action.value.fieldErrors?.comment}</p>}
            {action.value?.commentId && <div>Comment added successfully</div>}
          </div>
        )}
      </Form>
    </section>
  );
});
