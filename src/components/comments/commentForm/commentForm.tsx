import { component$ } from '@builder.io/qwik';
import styles from './commentForm.module.css';
import { useAuthenticated } from '~/routes';
import { Form, routeAction$ } from '@builder.io/qwik-city';

export const useAddComment = routeAction$((data, requestEvent) => {
  // This will only run on the server when the user submits the form (or when the action is called programmatically)
  console.log('dd', data);
  return {
    error: false,
    success: true,
    commentId: 1234,
  };
});

interface CommentProps {
  reply?: boolean;
}

export default component$<CommentProps>((props) => {
  const { reply } = props;

  const session = useAuthenticated();
  const action = useAddComment();

  return (
    <section class={styles['wrapper']}>
      <div class={styles['avatar']}>
        <img src={session.value.avatar} />
      </div>
      <Form class={styles['form']} action={action}>
        <textarea
          class={styles['textarea']}
          rows={3}
          name="comment"
          placeholder={`Add a ${reply ? 'reply' : 'comment'}...`}
        />
        <div class={styles['submit-wrapper']}>
          <button class={styles['submit']} type="submit">
            {reply ? 'Reply' : 'Comment'}
          </button>
          {action.value?.success && <div>Success!</div>}
          {action.value?.error && <div>Error</div>}
          {action.value?.commentId && <div>Comment added successfully</div>}
        </div>
      </Form>
    </section>
  );
});
