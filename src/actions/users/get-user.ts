"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUser = unstable_cache(
  async (userId: string) => {
    try {
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
    } catch (error) {
      console.log("GET ALL CATEGORIES ACTION:", error);
    }
  },
  ["users"],
  { tags: ["users"] }
);
