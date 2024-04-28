"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const updateCategory = async (categoryId: string, data: any) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });

    revalidateTag("categories");

    return { data: category };
  } catch (error) {
    console.log("CREATE PRODUCT ACTION:", error);
  }
};
