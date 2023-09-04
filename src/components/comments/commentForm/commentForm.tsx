import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/textInput";
import { useCurrentUser } from "~/routes/(app)/layout";
import { useCreateComment } from "~/routes/(app)/posts/[slug]";

interface CommentProps {
  reply?: boolean;
  postId: number;
}

export const CommentForm = component$((props: CommentProps) => {
  const { reply, postId } = props;

  const userSig = useCurrentUser();
  const actionSig = useCreateComment();

  if (!userSig.value?.id) return <div>Sign in to comment</div>;

  return (
    <section class="flex my-4 gap-4">
      <div>
        <Avatar src={userSig.value?.avatar} size="lg" />
      </div>

      <Form
        class="mb-2 flex-1 flex flex-col content-end"
        action={actionSig}
        onSubmitCompleted$={(_, form) => {
          console.log("onSubmitCompleted$");
          form.reset();
        }}
      >
        <input type="hidden" name="postId" value={postId} />
        {/* TODO: https://github.com/avanderpluijm/qwik-tube-demo/issues/2 */}
        <TextInput name="message" placeholder="Add a comment..." />

        <div class="text-right mt-2">
          <div class="flex content-end gap-1">
            <Button type="reset" roundedFull colorScheme="btn-secondary">
              Cancel
            </Button>
            <Button
              loading={actionSig.isRunning}
              type="submit"
              roundedFull
              colorScheme="btn-primary"
            >
              {reply ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
});
