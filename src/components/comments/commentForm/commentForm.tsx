import { component$, useContext } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

import { useAddComment, useAuthenticated } from "~/routes";
import styles from "./commentForm.module.css";
import { CTX } from "~/routes/layout";

interface CommentProps {
  reply?: boolean;
}

export const CommentForm = component$<CommentProps>((props) => {
  const { reply } = props;

  const session = useAuthenticated();
  const action = useAddComment();
  const user = useContext(CTX);

  if (!user.authenticated) return <div>Sign in to comment</div>;

  return (
    <section class={styles["wrapper"]}>
      <div class="mr-4">
        <img
          src={session.value.avatar}
          width={reply ? 30 : 40}
          height={reply ? 30 : 40}
        />
      </div>
      <Form class={styles["form"]} action={action}>
        <textarea
          class={styles["textarea"]}
          rows={3}
          name="comment"
          value={action.formData?.get("comment")?.toString()}
          placeholder={`Add a ${reply ? "reply" : "comment"}...`}
        />
        <div class="text-right mt-2">
          <button
            class="bg-slate-600 py-2 px-4 rounded-xl text-slate-400 hover:text-slate-50 "
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
