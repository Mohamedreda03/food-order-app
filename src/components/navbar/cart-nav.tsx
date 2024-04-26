"use client";

import { RootState } from "@/rtk/store";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartNav = () => {
  const cart = useSelector((state: RootState) => state.cart.products);

  return (
    <div>
      <div className="flex gap-2 items-center justify-center bg-primary rounded-full text-white px-4 py-2">
        <ShoppingBag size={24} />
        <span>{cart.length}</span>
      </div>
    </div>
  );
};

export default CartNav;
