"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getProductSizes = unstable_cache(
  async (productId: string) => {
    try {
      const data = await db.size.findMany({
        where: {
          productId: productId,
        },
      });

      return data;
    } catch (error) {
      console.log("GET PRODUCT SIZES ACTION:", error);
    }
  },
  ["sizes", "products"],
  { tags: ["sizes", "products"] }
);
