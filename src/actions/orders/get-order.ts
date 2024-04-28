"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidateTag, unstable_cache } from "next/cache";

export const getOrder = unstable_cache(
  async (orderId: string) => {
    try {
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
    } catch (error) {
      console.log("GET ORDER ACTION:", error);
    }
  },
  ["orders"],
  { tags: ["orders"] }
);
