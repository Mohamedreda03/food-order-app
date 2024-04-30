"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getBestSellersProducts = async () => {
  noStore();
  const data = await db.product.findMany({
    where: {
      best_seller: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      sizes: true,
    },
  });

  return data;
};
