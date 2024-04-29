"use client";

import CartItem from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useCart, { type CartItem as CartItemType } from "@/hooks/use-cart";
import { fCurrency } from "@/lib/utils";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const cart = useCart();

  const total = cart.items.reduce((acc, item: CartItemType) => {
    return acc + Number(item.item.price) * item.quantity!;
  }, 0);

  const handleCheckout = async () => {
    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`,
        {
          method: "POST",
          cache: "no-cache",
          next: { tags: ["orders"], revalidate: 30 },
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cart.items }),
        }
      );

      const data = await res.json();
      router.replace(data.url);
    });
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      cart.removeAllItems();
      toast.success("Order placed successfully");
    }

    if (searchParams.get("canceled")) {
      toast.error("Order canceled");
    }
  }, [searchParams]);

  return (
    <div className="wrapper py-8 flex flex-col gap-6 min-h-[600px]">
      <h1 className="text-center text-5xl font-medium text-primary">Cart</h1>
      {cart.items.length < 1 ? (
        <div className="text-center text-lg text-muted-foreground">
          Your cart is empty
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 flex-[1.4]">
            {cart.items.map((data: CartItemType) => (
              <CartItem key={data.newId} item={data as any} />
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
