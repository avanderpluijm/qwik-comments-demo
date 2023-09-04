import { type RequestEventAction } from "@builder.io/qwik-city";
import { type Prisma } from "@prisma/client";
import { db } from "~/database/connection";
import { type AuthUser } from "~/types/user";

export const handleCreateComment = async (
  commentData: Partial<Prisma.CommentUncheckedCreateInput>,
  { sharedMap, redirect, error, url }: RequestEventAction
) => {
  const user = sharedMap.get("user") as AuthUser | undefined;
  if (!user) throw error(403, "Unauthorized");
  await createComment({
    ...commentData,
    userId: user.id,
  });
  throw redirect(302, url.pathname);
};

const createComment = (values: any) => {
  return db.comment.create({
    data: values,
  });
};
