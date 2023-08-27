import { component$, useContext } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

import { useAddComment } from "~/routes";
import styles from "./commentForm.module.css";
import { CTX } from "~/routes/layout";
import { Avatar } from "~/components/ui/avatar/avatar";

interface CommentProps {
  reply?: boolean;
}

export const CommentForm = component$<CommentProps>((props) => {
  const { reply } = props;

  const action = useAddComment();
  const user = useContext(CTX);

  if (!user.authenticated) return <div>Sign in to comment</div>;

  return (
    <section class={styles["wrapper"]}>
      <Avatar name={user.user.name} color={user.user.color} size={10} />

      <Form class="mb-2 flex-1 flex flex-col content-end" action={action}>
        <div
          class={`bg-transparent border-b py-1 text-sm focus:outline-none block w-full overflow-hidden resize-none`}
          role="textbox"
          contentEditable="true"
          data-placeholder={`Add a ${reply ? "reply" : "comment"}...`}
        >
          {action.formData?.get("comment")?.toString()}
        </div>
        {/* TODO: Only show buttons when textbox is active */}
        <div class="text-right mt-2">
          {/* TODO: Add cancel button */}
          <button
            class="bg-slate-600 py-2 px-4 rounded-full text-slate-400 hover:text-slate-50 "
            type="submit"
          >
            {reply ? "Reply" : "Comment"}
          </button>
          {action.value?.success && <div>Success!</div>}
          {action.value?.failed && <p>{action.value.fieldErrors?.comment}</p>}
          {action.value?.commentId && <div>Comment added successfully</div>}
        </div>
      </Form>
    </section>
  );
});
