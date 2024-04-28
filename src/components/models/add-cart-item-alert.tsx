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
import { useEffect, useState } from "react";
import { fCurrency } from "@/lib/utils";
import { Product, Size } from "@prisma/client";
import useCart from "@/hooks/use-cart";
import { getProductSizes } from "@/actions/sizes/get-product-sizes";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  item: Product;
  setIsOpen: (value: boolean) => void;
}

export default function AddItemCartAlert({
  isOpen,
  onClose,
  item,
  setIsOpen,
}: DeleteAlertProps) {
  const [size, setSize] = useState<string | null>(null);
  const [sizes, setSizes] = useState<Size[] | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const selectedSize = sizes?.find((s) => s.id === size);
  const price = (selectedSize?.price as number) * quantity;

  const cart = useCart();

  useEffect(() => {
    getProductSizesData();
  }, []);

  const getProductSizesData = async () => {
    try {
      const data = await getProductSizes(item.id);
      setSizes(data as Size[]);
      if (data && data.length > 0) {
        setSize(data[0].id as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart = () => {
    cart.addItem({
      item,
      quantity,
      size: selectedSize?.name as string,
    });
    setIsOpen(false);
  };

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
            <Select
              onValueChange={(e) => setSize(e.valueOf())}
              defaultValue={size as string}
            >
              <SelectTrigger>
                <SelectValue
                  defaultValue={size as string}
                  placeholder="Select a size"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sizes?.map((size) => (
                    <SelectItem key={size.id} value={size.id}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Quantity</Label>
            <Select
              onValueChange={(e) => setQuantity(Number(e.valueOf()))}
              defaultValue={String(quantity)}
            >
              <SelectTrigger>
                <SelectValue
                  defaultValue={quantity}
                  placeholder="Select a quantity"
                />
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
          <Button onClick={addItemToCart} className="rounded-full w-full mt-3">
            Add to cart
          </Button>
        </div>
      </div>
    </Alert>
  );
}
