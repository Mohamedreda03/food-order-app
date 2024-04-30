"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteSize = async (sizeId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  await db.size.delete({
    where: {
      id: sizeId,
    },
  });

  revalidatePath("sizes");

  return { message: "Size deleted successfully" };
};
