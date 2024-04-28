"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteSize = async (sizeId: string) => {
  try {
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

    revalidateTag("products");

    return { message: "Size deleted successfully" };
  } catch (error) {
    console.log("CREATE PRODUCT ACTION:", error);
  }
};
