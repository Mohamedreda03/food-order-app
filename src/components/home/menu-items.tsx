import { getBestSellersProducts } from "@/actions/products/get-best-sellers-products";
import CardItem from "../card-item";
import { Product } from "@prisma/client";

const MenuItems = async () => {
  const data = await getBestSellersProducts();

  return (
    <div className="my-20">
      <h3 className="flex items-center justify-center text-5xl text-primary font-bold">
        BEST SELLERS
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {data?.map((item: Product) => (
          <CardItem item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
