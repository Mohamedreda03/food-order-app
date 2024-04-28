"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductFormTypes } from "@/types/schema";
import { Product } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createSize = async (sizeId: string, data: any) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    await db.size.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        product: {
          connect: {
            id: sizeId,
          },
        },
      },
    });

    console.log("CREATE SIZE ACTION:", data);

    revalidateTag("products");

    return { message: "Size updated successfully" };
  } catch (error) {
    console.log("CREATE PRODUCT ACTION:", error);
  }
};
