"use client";

import LoadingCard from "../loading-card";
import { useGetLastProductsQuery } from "@/rtk/features/products/productsApislice";
import { Product } from "@prisma/client";
import CardItem from "../card-item";

const NewItems = () => {
  const { data } = useGetLastProductsQuery({});
  return (
    <div className="my-20">
      <h3 className="flex items-center justify-center text-5xl text-primary font-bold">
        NEW ITEMS
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {data ? (
          <>
            {data?.data?.map((item: Product) => (
              <CardItem item={item} key={item?.id} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewItems;
