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

      const products = await db.product.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          sizes: true,
          category: true,
        },
      });
      const categoriesCount = await db.product.count();
      const pageCount = Math.ceil(categoriesCount / Number(size));

      return { data: products, count: pageCount };
    } catch (error) {
      console.log("PRODUCTS PAGINATION ACTION:", error);
    }
  },
  ["products"],
  { tags: ["products"] }
);
