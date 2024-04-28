"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getProductsPagination = unstable_cache(
  async (page: string | number = 1, size: string | number = 10) => {
    try {
      const session = await auth();

      const skip = (Number(page) - 1) * Number(size) || 0;
      const take = Number(size) || 10;

      if (!session) {
        return { error: "Unauthorized" };
      }

      if (!session.user?.isAdmin) {
        return { error: "you should be admin." };
      }

      const users = await db.user.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const usersCount = await db.user.count();
      const pageCount = Math.ceil(usersCount / Number(size));

      return { data: users, count: pageCount };
    } catch (error) {
      console.log("USRS PAGINATION ACTION:", error);
    }
  },
  ["usrs"],
  { tags: ["users"] }
);
