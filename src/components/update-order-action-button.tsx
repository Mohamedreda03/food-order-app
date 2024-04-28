"use client";

import { Order } from "@prisma/client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { updateOrder } from "@/actions/orders/update-order";

const UpdateOrderActionButton = ({ data }: { data: Order }) => {
  const [isPeinding, startTransaction] = useTransition();
  const handleUpdateOrder = async (status: string) => {
    startTransaction(async () => {
      try {
        await updateOrder(data.id, { status: status });
      } catch (error) {
        console.log("UPDATE ORDER ACTION:", error);
      }
    });
  };
  return (
    <div>
      {data?.status === "PAID" && (
        <Button
          disabled={isPeinding}
          onClick={() => handleUpdateOrder("ON_THE_WAY")}
          className="bg-blue-600 hover:bg-blue-500"
        >
          ON THE WAY
        </Button>
      )}
      {data?.status === "ON_THE_WAY" && (
        <Button
          disabled={isPeinding}
          onClick={() => handleUpdateOrder("DELIVERED")}
          className="bg-purple-600 hover:bg-purple-500"
        >
          DELIVERED
        </Button>
      )}
    </div>
  );
};

export default UpdateOrderActionButton;
