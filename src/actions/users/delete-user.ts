"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteUser = async (userId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  });

  revalidateTag("users");

  return { message: "User deleted" };
};
