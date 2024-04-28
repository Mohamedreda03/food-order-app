import { fCurrency } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import useCart, { type CartItem } from "@/hooks/use-cart";

const CartItem = ({ item }: { item: CartItem }) => {
  const total = (item.item.price as number) * (item.quantity || 1);

  const cart = useCart();

  const updateItemData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    cart.updateItemQuantity(item.newId as number, Number(e.target.value));
  };

  const deleteItemData = () => {
    cart.removeItem(item.newId as number);
  };

  return (
    <div className="border border-gray-200 p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={item.item.image as string}
            alt="image"
            width={100}
            height={100}
            className="rounded-md w-[100px] h-[100px] object-cover"
          />
          <div className="flex flex-col gap-1 ml-5">
            <h3 className="text-lg font-medium">{item.item.name}</h3>
            <div className="flex items-center gap-6">
              <p>Size: {item.size}</p>
              <p className="text-muted-foreground flex items-center gap-3">
                quantity
                <select defaultValue={item?.quantity} onChange={updateItemData}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <p className="text-primary font-medium">
              {fCurrency.format(total)}
            </p>
          </div>
        </div>
        <div>
          <Button
            onClick={deleteItemData}
            variant="outline"
            className="text-muted-foreground"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
