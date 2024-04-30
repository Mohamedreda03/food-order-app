"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductFormTypes } from "@/types/schema";
import { revalidateTag } from "next/cache";

export const createProduct = async (data: ProductFormTypes) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });

  revalidateTag("products");

  return { message: "Product created successfully" };
};
