import { CartItem } from "@/rtk/features/cart/cartSlice";
import Alert from "../alert";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { fCurrency } from "@/lib/utils";

import { useDispatch } from "react-redux";
import { addItem } from "@/rtk/features/cart/cartSlice";
import { Product, Size } from "@prisma/client";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  item: ProductWithSize;
}

interface ProductWithSize extends Product {
  sizes?: Size[];
}

export default function AddItemCartAlert({
  isOpen,
  onClose,
  item,
}: DeleteAlertProps) {
  const [size, setSize] = useState<string>("small");
  const [quantity, setQuantity] = useState<number>(1);
  const price = (item?.price as number) * quantity;

  const dispatch = useDispatch();

  return (
    <Alert title="Add item to cart" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-8">
        <div>
          {item?.image ? (
            <Image
              src={item?.image}
              alt="image"
              width={150}
              height={150}
              className="w-[200px] h-[150px] object-cover mb-4 rounded-md"
            />
          ) : (
            <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
          )}
          <div>
            <h3 className="text-lg font-medium">{item?.name}</h3>
            <p className="text-muted-foreground">{fCurrency.format(price)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <Label>Size</Label>
            <Select onValueChange={(e) => setSize(e.valueOf())}>
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {item?.sizes?.map((size) => (
                    <SelectItem key={size.id} value={size.name}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Quantity</Label>
            <Select onValueChange={(e) => setQuantity(Number(e.valueOf()))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              onClose();
              dispatch(
                addItem({
                  ...item,
                  size: size as "small" | "medium" | "large",
                  quantity,
                  newId: 0,
                })
              );
            }}
            className="rounded-full w-full mt-3"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Alert>
  );
}
