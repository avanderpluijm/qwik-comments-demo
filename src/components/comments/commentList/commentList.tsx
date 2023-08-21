import { component$ } from '@builder.io/qwik';
import { useAuthenticated, useComments } from '~/routes/index';
import CommentForm from '../commentForm/commentForm';
import { CommentToolbar } from '../commentToolbar/commentToolbar';
import styles from './commentList.module.css';

export default component$(() => {
  const comments = useComments();
  const session = useAuthenticated();

  return (
    <div class={styles['list']}>
      {comments.value.map((comment) => (
        <>
          <div class={styles['list-item']}>
            <div class={styles['avatar']}>
              <img src={comment.author.avatar} />
            </div>

            <div class={styles['content-wrapper']}>
              <div>
                <span class={styles['username']}>username</span>
                <span class={styles['post-date']}>postdate</span>
              </div>
              <div class={styles['comment-text']}>{comment.comment}</div>

              <CommentToolbar>
                <CommentForm reply={true} />
              </CommentToolbar>
            </div>
          </div>
          <div></div>
        </>
      ))}
    </div>
  );
});
