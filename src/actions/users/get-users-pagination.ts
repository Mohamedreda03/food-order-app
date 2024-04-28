"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUsersPagination = unstable_cache(
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

      const products = await db.user.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const usersCount = await db.user.count();
      const pageCount = Math.ceil(usersCount / Number(size));

      return { data: products, count: pageCount };
    } catch (error) {
      console.log("PRODUCTS PAGINATION ACTION:", error);
    }
  },
  ["users"],
  { tags: ["users"] }
);
