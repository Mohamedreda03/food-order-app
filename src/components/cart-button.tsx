"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { fCurrency } from "@/lib/utils";
import { Product } from "@prisma/client";
import AddItemCartAlert from "./models/add-cart-item-alert";

const CartButton = ({ item }: { item: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AddItemCartAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
        setIsOpen={setIsOpen}
      />
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full flex items-center justify-center w-full my-4"
      >
        Add To Cart {fCurrency.format(item?.price as number)}
      </Button>
    </>
  );
};

export default CartButton;
