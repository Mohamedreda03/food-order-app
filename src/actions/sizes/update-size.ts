"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductFormTypes } from "@/types/schema";
import { Product } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const updateSize = async (sizeId: string, data: any) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    await db.size.update({
      where: { id: sizeId },
      data,
    });

    revalidateTag("products");

    return { message: "Size updated successfully" };
  } catch (error) {
    console.log("CREATE PRODUCT ACTION:", error);
  }
};
