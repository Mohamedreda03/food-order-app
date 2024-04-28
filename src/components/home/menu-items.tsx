import CardItem from "../card-item";
import LoadingCard from "../loading-card";
import type { CartItem as CartItemType } from "@/rtk/features/cart/cartSlice";

const getBestSellersItems = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products/best-sellers`,
    { next: { tags: ["products"] } }
  );

  const data = await res.json();
  return data;
};

const MenuItems = async () => {
  const data = await getBestSellersItems();

  return (
    <div className="my-20">
      <h3 className="flex items-center justify-center text-5xl text-primary font-bold">
        BEST SELLERS
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {data?.data?.map((item: CartItemType) => (
          <CardItem item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
