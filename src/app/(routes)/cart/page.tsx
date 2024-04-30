"use client";

import AddressCart from "@/components/address-cart";
import CartItem from "@/components/cart-item";
import useCart, { type CartItem as CartItemType } from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const searchParams = useSearchParams();

  const cart = useCart();

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
            <div className="flex flex-col gap-5">
              <AddressCart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
