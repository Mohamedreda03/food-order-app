import Image from "next/image";
import { Product } from "@prisma/client";
import CartButton from "./cart-button";

interface CardItemProps {
  item: Product;
}

export default function CardItem({ item }: CardItemProps) {
  return (
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
        <h3 className="line-clamp-1 text-xl text-gray-900 text-center w-full">
          {item?.name}
        </h3>
        <p className="line-clamp-1 text-muted-foreground text-sm">
          {item?.description}
        </p>
      </div>
      <CartButton item={item} />
    </div>
  );
}
