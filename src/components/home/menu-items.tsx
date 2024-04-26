"use client";

import { useGetProductsFilterQuery } from "@/rtk/features/products/productsApislice";
import CardItem from "../card-item";
import LoadingCard from "../loading-card";
import type { CartItem as CartItemType } from "@/rtk/features/cart/cartSlice";

const MenuItems = () => {
  const { data } = useGetProductsFilterQuery({});

  return (
    <div className="my-20">
      <h3 className="flex items-center justify-center text-5xl text-primary font-bold">
        BEST SELLERS
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {data ? (
          <>
            {data?.data?.map((item: CartItemType) => (
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

export default MenuItems;
