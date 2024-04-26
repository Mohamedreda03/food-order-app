"use server";

import { db } from "../db";

export const getPageProductsData = async (
  pageNumber: string,
  pageSize: string
) => {
  const skip = (Number(pageNumber) - 1) * Number(pageSize) || 0;
  const take = Number(pageSize) || 10;

  const products = await db.product.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const productsCount = await db.product.count();
  const pageCount = Math.ceil(productsCount / Number(pageSize));

  return {
    products,
    pageCount,
  };
};
