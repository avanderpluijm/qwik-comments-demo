import { component$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';

import CommentForm from '~/components/comments/commentForm/commentForm';
import CommentList from '~/components/comments/commentList/commentList';
import { comments } from '../components/comments/Comments';

export const useComments = routeLoader$(() => {
  return comments;
});

export const useAuthenticated = routeLoader$(() => {
  return {
    status: true,
    username: 'User 1',
    avatar: 'https://api.multiavatar.com/3.svg',
  };
});

export default component$(() => {
  const comments = useComments();

  return (
    <div class="container">
      <div class="item-preview"></div>
      <h3>{comments.value.length} Comments</h3>

      <CommentForm />
      <CommentList />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
