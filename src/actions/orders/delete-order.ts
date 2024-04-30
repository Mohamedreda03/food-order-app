"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteOrder = async (orderId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  await db.order.delete({ where: { id: orderId } });

  revalidateTag("orders");

  return { message: "order deleted" };
};
