"use client";

import Loading from "@/components/Loading";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { useEffect, useState } from "react";
import { ProductFormTypes } from "@/types/schema";

import LoadingProfile from "@/components/profile/loading-profile";
import {
  useGetProductQuery,
  useGetSizesQuery,
  useUpdateProductMutation,
} from "@/rtk/features/products/productsApislice";
import { useParams } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/rtk/features/categories/categoriesApiSlice";

import UpdateProductFrom from "./_components/update-product-from";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data } = useSession();
  const params = useParams();

  const { data: categories } = useGetAllCategoriesQuery({});

  const { data: product, isLoading: isGetProductLoading } = useGetProductQuery(
    params.productId
  );

  if (isGetProductLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      {isGetProductLoading && <Loading />}
      <div className="py-20 wrapper flex flex-col">
        {!data?.user.isAdmin && (
          <h2 className="flex items-center justify-center text-5xl font-medium text-primary mb-6">
            Profile
          </h2>
        )}

        <UpdateProductFrom categories={categories?.data} product={product} />
      </div>
    </>
  );
}
