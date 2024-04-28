"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const updateOrder = async (orderId: string, data: any) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }

    if (!session.user?.isAdmin) {
      return { error: "you should be admin." };
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data,
    });

    revalidateTag("orders");

    return { message: "order updated" };
  } catch (error) {
    console.log("UPDATE ORDER ACTION:", error);
  }
};
