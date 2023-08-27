import { component$ } from "@builder.io/qwik";
import { useComments } from "~/routes/index";
import { CommentForm } from "~/components/comments/commentForm/commentForm";
import { CommentToolbar } from "~/components/comments/commentToolbar/commentToolbar";
import styles from "./commentList.module.css";

export const CommentList = component$(() => {
  const comments = useComments();
  // const session = useAuthenticated();

  return (
    <div class={styles["list"]}>
      {comments.value.map((comment, index) => (
        <div key={index} class={styles["list-item"]}>
          <div>
            <img
              src={comment.author.avatar}
              width={40}
              height={40}
              class="mr-2"
            />
          </div>
          <div class={styles["content-wrapper"]}>
            <div>
              <span class={styles["username"]}>username</span>
              <span class={styles["post-date"]}>postdate</span>
            </div>
            <div class={styles["comment-text"]}>{comment.comment}</div>

            <CommentToolbar>
              <CommentForm reply={true} />
            </CommentToolbar>
          </div>
        </div>
      ))}
    </div>
  );
});
