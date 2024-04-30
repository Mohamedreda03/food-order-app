"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getCategory = async (categoryId: string) => {
  noStore();
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const data = await db.category.findFirst({
    where: { id: categoryId },
  });

  return data;
};
