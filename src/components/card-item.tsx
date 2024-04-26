import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { fCurrency } from "@/lib/utils";
import { type CartItem } from "@/rtk/features/cart/cartSlice";
import AddItemCartAlert from "./models/add-cart-item-alert";

interface CardItemProps {
  item: CartItem;
}

export default function CardItem({ item }: CardItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddItemCartAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
      />
      <div
        key={item?.id}
        className="border p-5 shadow-md shadow-gray-100 rounded-md flex items-center flex-col"
      >
        {item?.image ? (
          <Image
            src={item?.image as string}
            width={300}
            height={300}
            className="rounded-md mb-4 h-[200px] w-full object-contain"
            alt="image"
          />
        ) : (
          <div className="rounded-md mb-4 h-[200px] w-full bg-slate-100 flex flex-col items-center justify-center">
            No Image
          </div>
        )}
        <div className="flex flex-col items-center justify-between w-full">
          <h3 className="text-xl text-gray-900 text-center w-full">
            {item?.name}
          </h3>
          <p className="line-clamp-1 text-muted-foreground text-sm">
            {item?.description}
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full flex items-center justify-center w-full my-4"
        >
          Add To Cart {fCurrency.format(item?.price as number)}
        </Button>
      </div>
    </>
  );
}
