"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getAllCategories = unstable_cache(
  async () => {
    try {
      const categorys = await db.category.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          products: {
            orderBy: { createdAt: "desc" },
            include: {
              sizes: true,
            },
          },
        },
      });

      return { data: categorys };
    } catch (error) {
      console.log("GET ALL CATEGORIES ACTION:", error);
    }
  },
  ["categories", "products"],
  { tags: ["categories", "products"] }
);
