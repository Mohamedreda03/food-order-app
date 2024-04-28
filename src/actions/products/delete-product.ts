"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteProduct = async (productId: string) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    await db.product.delete({ where: { id: productId } });

    revalidateTag("products");

    return { message: "product deleted" };
  } catch (error) {
    console.log("DELETE PRODUCT ACTION:", error);
  }
};
