"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { Clipboard, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Order } from "@prisma/client";
import DeleteAlert from "./models/delete-alert";
import { deleteOrder } from "@/actions/orders/delete-order";

const OrderTableActions = ({ item }: { item: Order }) => {
  const [isPeinding, startTransaction] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const router = useRouter();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("copied.");
  };

  const onDelete = async () => {
    startTransaction(async () => {
      try {
        await deleteOrder(currentItem!);
        router.refresh();
        setIsOpen(false);

        toast.success("Order deleted successfully");
      } catch (error) {
        console.log("DELETE ORDER ACTION:", error);
      }
    });
  };
  return (
    <>
      <DeleteAlert
        title="Delete"
        description="Are you sure you want to delete this item?"
        isOpen={isOpen}
        isLoading={isPeinding}
        onClose={() => setIsOpen(false)}
        onDelete={onDelete}
      />
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => onCopy(item.id)}
          className="px-2"
          variant="outline"
        >
          <Clipboard size={20} />
        </Button>
        <Link href={`/admin/orders/${item.id}`}>
          <Button>Order</Button>
        </Link>
        <Button
          onClick={() => {
            setIsOpen(true);
            setCurrentItem(item.id);
          }}
          className="px-2"
          variant="destructive"
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </>
  );
};

export default OrderTableActions;
