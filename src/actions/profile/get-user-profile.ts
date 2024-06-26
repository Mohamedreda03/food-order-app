"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getUserProfile = async () => {
  noStore();
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const data = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      tel: true,
      street_address: true,
      post_code: true,
      city: true,
      country: true,
      isAdmin: true,
    },
  });

  if (!data) {
    return { error: "User not found" };
  }

  return data;
};
