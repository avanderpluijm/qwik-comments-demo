import { $, Slot, component$, useSignal } from '@builder.io/qwik';
import styles from './commentToolbar.module.css';
import {
  HiHandThumbDownOutline,
  HiHandThumbUpOutline,
} from '@qwikest/icons/heroicons';

export const CommentToolbar = component$(() => {
  const collapsed = useSignal(true);

  const randomVoteCount = Math.floor(Math.random() * (100 - 0 + 1) + 0);

  const toggle = $(() => {
    collapsed.value = !collapsed.value;
  });

  return (
    <div class={styles['collapsible']}>
      <div class={styles['toolbar']}>
        <div class={styles['vote-up']}>
          <HiHandThumbUpOutline />
          <span class={styles['vote-count']}>{randomVoteCount}</span>
        </div>
        <div class={styles['vote-down']}>
          <HiHandThumbDownOutline />
          <span class={styles['vote-count']}>{randomVoteCount}</span>
        </div>
        <div class={styles['reply']} onclick$={toggle}>
          Reply
        </div>
      </div>
      <section hidden={collapsed.value}>
        <Slot />
      </section>
    </div>
  );
});
