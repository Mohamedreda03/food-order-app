"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileFormTypes } from "@/types/schema";
import { revalidateTag, unstable_cache } from "next/cache";

export const deleteUser = async (userId: string) => {
  try {
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
  } catch (error) {
    console.log("GET ALL CATEGORIES ACTION:", error);
  }
};
