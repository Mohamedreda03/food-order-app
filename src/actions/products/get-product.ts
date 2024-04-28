"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getProduct = unstable_cache(
  async (productId: string) => {
    try {
      const session = await auth();

      if (!session) {
        return { error: "Unauthorized" };
      }

      if (!session.user?.isAdmin) {
        return { error: "you should be admin." };
      }

      const data = await db.product.findFirst({
        where: { id: productId },
      });

      return data;
    } catch (error) {
      console.log("GET ORDER ACTION:", error);
    }
  },
  ["products"],
  { tags: ["products"] }
);
