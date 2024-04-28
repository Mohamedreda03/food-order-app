"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getNewProducts = unstable_cache(
  async () => {
    try {
      const data = await db.product.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          sizes: true,
        },
      });

      return data;
    } catch (error) {
      console.log("PRODUCTS PAGINATION ACTION:", error);
    }
  },
  ["products"],
  { tags: ["products"] }
);
