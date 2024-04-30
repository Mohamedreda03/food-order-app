"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CategoryFormTypes } from "@/types/schema";
import { revalidateTag } from "next/cache";

export const createCategory = async (data: CategoryFormTypes) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const category = await db.category.create({
    data: {
      name: data.name,
      image: data.image,
    },
  });

  revalidateTag("categories");

  return { data: category };
};
