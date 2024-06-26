"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteCategory = async (categoryId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const hasProducts = await db.product.findFirst({
    where: { categoryId },
  });

  if (hasProducts) {
    return { error: "Category has products, can't delete." };
  }

  const data = await db.category.delete({ where: { id: categoryId } });

  revalidateTag("categories");

  return { data };
};
