"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const createSize = async (sizeId: string, data: any) => {
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

  revalidateTag("sizes");

  return { message: "Size updated successfully" };
};
