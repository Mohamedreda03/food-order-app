"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getProductSizes = async (productId: string) => {
  noStore();
  const data = await db.size.findMany({
    where: {
      productId: productId,
    },
  });

  return data;
};
