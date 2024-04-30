"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllCategories = async () => {
  noStore();
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
};
