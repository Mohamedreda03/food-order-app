"use client";

import Loading from "@/components/Loading";
import CategoryMenuItem from "@/components/category-menu-item";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CartItem } from "@/rtk/features/cart/cartSlice";
import { useGetAllCategoriesQuery } from "@/rtk/features/categories/categoriesApiSlice";
import { Category } from "@prisma/client";

interface CategoryType extends Category {
  products: CartItem[];
}

const Page = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});

  return (
    <>
      {isLoading && <Loading />}
      <div className="wrapper my-20">
        <h1 className="flex items-center justify-center text-6xl font-medium text-primary">
          Categories
        </h1>
        <div>
          {data?.data?.map((category: CategoryType, i: number) => (
            <div key={category.id}>
              <div>
                <h2 className="text-3xl mb-6 border-b-2 border-primary w-fit font-medium">
                  {category.name}
                </h2>
                <div>
                  <CategoryMenuItem
                    key={category.id}
                    items={category.products}
                  />
                </div>
              </div>
              <Separator
                className={cn(`my-8`, {
                  hidden: i + 1 === data.data.length,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
