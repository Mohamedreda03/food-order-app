"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_cache, unstable_noStore as noStore } from "next/cache";

export const getOrder = async (orderId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const data = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: true,
    },
  });

  return data;
};
