"use server";

import { db } from "../db";

export const getPageUsersData = async (
  pageNumber: string,
  pageSize: string
) => {
  const skip = (Number(pageNumber) - 1) * Number(pageSize) || 0;
  const take = Number(pageSize) || 10;

  const users = await db.user.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersCount = await db.user.count();
  const pageCount = Math.ceil(usersCount / Number(pageSize));

  return {
    users,
    pageCount,
  };
};
