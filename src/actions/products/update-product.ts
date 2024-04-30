"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const updateProduct = async (productId: string, data: any) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const product = await db.product.update({
    where: { id: productId },
    data: {
      ...data,
      price: parseFloat(data.price),
    },
  });

  revalidateTag("products");

  return { data: product };
};
