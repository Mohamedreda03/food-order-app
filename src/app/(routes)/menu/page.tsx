import { getAllCategories } from "@/actions/categories/get-all-categories";
import CategoryMenuItem from "@/components/category-menu-item";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

interface CategoryType extends Category {
  products: CartItem[];
}

const Page = async () => {
  const data: any = await getAllCategories();

  return (
    <>
      <div className="wrapper my-20">
        <h1 className="flex items-center justify-center text-6xl font-semibold text-primary mb-14">
          MENU
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
                    items={category.products as any}
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
