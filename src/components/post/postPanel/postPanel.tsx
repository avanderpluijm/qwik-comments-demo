import { component$ } from "@builder.io/qwik";

import { Video } from "~/components/ui/video";
import { useGetPost } from "~/routes/(app)/posts/[slug]";
import { PublisherToolbar } from "~/components/post/publisherToolbar/publisherToolbar";
import { InlineExpander } from "~/components/ui/inlineExpander";
import { CommentPanel } from "~/components/comments/commentPanel/commentPanel";

export const PostPanel = component$(() => {
  const postSignal = useGetPost();

  return (
    <>
      <Video post={postSignal} />

      <h1>{postSignal.value?.title}</h1>

      <PublisherToolbar />
      <InlineExpander
        content={postSignal.value?.description || ""}
        length={150}
      />
      <CommentPanel />
    </>
  );
});
