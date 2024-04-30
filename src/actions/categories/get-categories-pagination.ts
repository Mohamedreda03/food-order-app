"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getCategoriesPagination = async (
  page: string | number = 1,
  size: string | number = 10
) => {
  noStore();
  const session = await auth();

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const categories = await db.category.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesCount = await db.category.count();
  const pageCount = Math.ceil(categoriesCount / Number(size));

  return { data: categories, count: pageCount };
};
