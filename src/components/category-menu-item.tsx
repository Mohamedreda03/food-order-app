import { Product } from "@prisma/client";
import CardItem from "./card-item";
import { CartItem } from "@/rtk/features/cart/cartSlice";

const CategoryMenuItem = ({ items }: { items: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-5">
      {items.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CategoryMenuItem;
