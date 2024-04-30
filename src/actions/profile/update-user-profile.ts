"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileFormTypes } from "@/types/schema";
import { revalidateTag } from "next/cache";

export const updateUserProfile = async (data: ProfileFormTypes) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const foundUser = await db.user.findUnique({
    where: {
      id: session.user?.id!,
    },
  });

  if (!foundUser) {
    return { error: "User not found" };
  }

  const user = await db.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      ...data,
    },
  });

  revalidateTag("users");

  return { data: user };
};
