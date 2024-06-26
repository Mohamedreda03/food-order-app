"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getOrdersPagination = async (
  page: string | number = 1,
  size: string | number = 10
) => {
  noStore();
  const session = await auth();

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (!session.user?.isAdmin) {
    return { error: "you should be admin." };
  }

  const orders = await db.order.findMany({
    skip,
    take,
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ordersCount = await db.order.count();
  const pageCount = Math.ceil(ordersCount / Number(size));

  return { data: orders, count: pageCount };
};
