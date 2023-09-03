// https://github.com/harshmangalam/qwik-x/blob/main/src/utils/auth.ts

import {
  type RequestEvent,
  type RequestEventAction,
} from "@builder.io/qwik-city";

import { comparePassword, generateProfileImage, hashPassword } from "./hash";
import {
  createUser,
  findUserForAuthorization,
  findUserForLogin,
  isEmailExists,
  isUsernameExists,
  updateUser,
} from "~/services/user";
import { signToken, verifyToken } from "./jwt";
import { type LoginSchema, type SignupSchema } from "~/types/auth";
import { type User } from "@prisma/client";

const handleSignup = async (
  { email, password, username }: SignupSchema,
  { fail, redirect }: RequestEventAction
) => {
  // verify email duplication
  const duplicateEmail = await isEmailExists(email);
  if (duplicateEmail)
    return fail(400, {
      error: "Email address already in use",
    });

  // verify username duplication
  const duplicateUsername = await isUsernameExists(username);
  if (duplicateUsername) return fail(400, { error: "Username already in use" });

  // generate gravtar from email
  const avatarUrl = await generateProfileImage(email);

  // generate password hash
  const hash = await hashPassword(password);

  // create new user and save in db
  await createUser({
    email,
    username,
    avatar: avatarUrl,
    password: hash,
    online: false,
  });
  throw redirect(302, "/login");
};

async function handleLogin(
  { password, username }: LoginSchema,
  { fail, cookie, redirect }: RequestEventAction
) {
  // check user exists
  const user = await findUserForLogin(username);
  if (!user)
    return fail(400, {
      error: "Invalid credentials",
    });

  // verify user password
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch)
    return fail(400, {
      error: "Invalid credentials",
    });

  // set online status to active
  await updateUser(user.id, {
    online: true,
  });

  // generate jwt token
  const accessToken = await signToken({ userId: user.id });
  const now = new Date();
  const expiration = new Date(now.getTime() + 2 * 3600000);
  cookie.set("accessToken", accessToken, {
    path: "/",
    expires: expiration,
  });
  throw redirect(302, "/");
}

async function handleLogout({
  redirect,
  cookie,
  sharedMap,
  error,
}: RequestEventAction) {
  const user = sharedMap.get("user") as User | undefined;
  if (!user) return error(403, "Unauthorized");
  // change user online status and add last seen datetime
  await updateUser(user.id, {
    online: false,
    lastSeen: new Date(),
  });

  // remove cookie from browser
  cookie.delete("accessToken");
  throw redirect(302, "/");
}

// verify jwt token on every request
// if token is valid then set user in sharedMap
// else throw error
// so that we can access user in every request without querying database
async function handleTokenVerification({
  cookie,
  error,
  sharedMap,
}: RequestEvent) {
  const token = cookie.get("accessToken");
  if (token?.value) {
    const userId = await verifyToken(token.value);
    if (!userId) {
      cookie.delete("accessToken");
      throw error(401, "Unauthenticated");
    }
    const user = await findUserForAuthorization(userId);

    if (!user) {
      cookie.delete("accessToken");
      throw error(401, "Unauthenticated");
    }
    sharedMap.set("user", user);
  }
}

export { handleSignup, handleLogin, handleTokenVerification, handleLogout };
