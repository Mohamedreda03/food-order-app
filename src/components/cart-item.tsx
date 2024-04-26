import { fCurrency } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteItem } from "@/rtk/features/cart/cartSlice";
import type { CartItem } from "@/rtk/features/cart/cartSlice";

import { useDispatch } from "react-redux";
import { updateItem } from "@/rtk/features/cart/cartSlice";

const CartItem = ({ item }: { item: CartItem }) => {
  const total = (item.price as number) * item.quantity;
  const dispatch = useDispatch();
  return (
    <div className="border border-gray-200 p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={item.image as string}
            alt="image"
            width={100}
            height={100}
            className="rounded-md w-[100px] h-[100px] object-cover"
          />
          <div className="flex flex-col gap-1 ml-5">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <div className="flex items-center gap-6">
              <p>Size: {item.size}</p>
              <p className="text-muted-foreground flex items-center gap-3">
                quantity
                <select
                  defaultValue={item?.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateItem({
                        ...item,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                >
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
            onClick={() => dispatch(deleteItem(item))}
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
