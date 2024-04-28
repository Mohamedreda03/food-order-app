"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileFormTypes } from "@/types/schema";
import { revalidateTag, unstable_cache } from "next/cache";

export const updateUserProfile = async (data: ProfileFormTypes) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    const foundUser = await db.user.findUnique({
      where: {
        email: session.user?.email!,
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

    revalidateTag("profile");

    return { data: user };
  } catch (error) {
    console.log("GET ALL CATEGORIES ACTION:", error);
  }
};
