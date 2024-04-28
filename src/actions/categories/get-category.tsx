"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getCategory = unstable_cache(
  async (categoryId: string) => {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }
    try {
      const data = await db.category.findFirst({
        where: { id: categoryId },
      });

      return data;
    } catch (error) {
      console.log("GET ALL CATEGORIES ACTION:", error);
    }
  },
  ["categories", "products"],
  { tags: ["categories", "products"] }
);
