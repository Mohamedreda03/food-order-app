"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getUser = async (userId: string) => {
  noStore();

  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!data) {
    return { error: "User not found" };
  }

  return { data };
};
