"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const updateSize = async (sizeId: string, data: any) => {
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

  revalidateTag("sizes");

  return { message: "Size updated successfully" };
};
