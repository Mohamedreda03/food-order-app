"use client";

import CartItem from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fCurrency } from "@/lib/utils";
import {
  deleteAllItems,
  type CartItem as CartItemType,
} from "@/rtk/features/cart/cartSlice";
import { RootState } from "@/rtk/store";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.cart.products);

  const total = data?.reduce((acc, item) => {
    return acc + Number(item.price) * (item.quantity ?? 0);
  }, 0);

  const handleCheckout = async () => {
    startTransition(async () => {
      const res = await axios.post("/api/checkout", { items: data });
      await router.replace(res.data.url);
      dispatch(deleteAllItems());
    });
  };

  return (
    <div className="wrapper py-8 flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-center text-5xl font-medium text-primary">Cart</h1>
      {data?.length < 1 ? (
        <div className="text-center text-lg text-muted-foreground">
          Your cart is empty
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 flex-[1.4]">
            {data?.map((item: CartItemType) => (
              <CartItem key={item.newId} item={item} />
            ))}
          </div>
          <div className="flex-[0.6]">
            <Card className="flex flex-col gap-4 p-6">
              <div>
                <h2 className="text-2xl font-medium">Order Summary</h2>
                <p className="text-muted-foreground mb-4">
                  Your cart total and shipping options
                </p>
              </div>

              <div className="flex items-center justify-between text-xl font-medium">
                <span>Total</span>
                <span>{fCurrency.format(total)}</span>
              </div>
              <Button
                disabled={isPending}
                onClick={handleCheckout}
                className="rounded-full w-full"
              >
                <LoaderCircle
                  className={`w-5 h-5 animate-spin mr-2 ${
                    isPending ? "block" : "hidden"
                  }`}
                />
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
