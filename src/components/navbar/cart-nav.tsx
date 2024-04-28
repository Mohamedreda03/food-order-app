"use client";

import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const CartNav = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div>
      <div className="flex gap-2 items-center justify-center bg-primary rounded-full text-white px-4 py-2">
        <ShoppingBag size={24} />
        <span>{cart.items.length}</span>
      </div>
    </div>
  );
};

export default CartNav;
