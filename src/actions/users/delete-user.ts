"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileFormTypes } from "@/types/schema";
import { revalidateTag, unstable_cache } from "next/cache";

export const updateUser = async (userId: string, data: any) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    const foundUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      return { error: "User not found" };
    }

    const user = await db.user.update({
      where: {
        id: foundUser.id,
      },
      data,
    });

    revalidateTag("users");

    return { data: user };
  } catch (error) {
    console.log("GET ALL CATEGORIES ACTION:", error);
  }
};
