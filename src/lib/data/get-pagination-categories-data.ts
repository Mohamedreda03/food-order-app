"use server";

import { db } from "../db";

export const getPageCategoriesData = async (
  pageNumber: string,
  pageSize: string
) => {
  const skip = (Number(pageNumber) - 1) * Number(pageSize) || 0;
  const take = Number(pageSize) || 10;

  const categories = await db.category.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesCount = await db.category.count();
  const pageCount = Math.ceil(categoriesCount / Number(pageSize));

  return {
    categories,
    pageCount,
  };
};
