import { Category, Order, User } from "@prisma/client";

import DeleteAlert from "../models/delete-alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteCategoryMutation } from "@/rtk/features/categories/categoriesApiSlice";
import Image from "next/image";
import { useDeleteOrderMutation } from "@/rtk/features/orders/orderSlice";
import { cn, fCurrency } from "@/lib/utils";
import OrderTableActions from "../order-table-actions";

interface TableProps {
  tableBody?: OrderType[];
}

interface OrderType extends Order {
  user: User;
}

const tableHead = ["UserId", "Total", "Status", "Actions"];

export default async function OrdersTable({ tableBody }: TableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {tableHead?.map((head, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-lg"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {tableBody?.map((item) => (
            <tbody key={item.id} className="divide-y divide-gray-200">
              <tr className="text-center">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item?.user?.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {fCurrency.format(item.total)}
                </td>
                <td
                  className={cn(
                    `whitespace-nowrap px-4 py-2 text-gray-700`,

                    {
                      "text-green-600": item.status === "PAID",
                      "text-red-600": item.status === "FAILED",
                      "text-yellow-600": item.status === "PENDING",
                      "text-blue-600": item.status === "ON_THE_WAY",
                      "text-purple-600": item.status === "DELIVERED",
                    }
                  )}
                >
                  <div
                    className={cn(`border w-fit rounded-full px-3 mx-auto`, {
                      "border-green-600": item.status === "PAID",
                      "border-red-600": item.status === "FAILED",
                      "border-yellow-600": item.status === "PENDING",
                      "border-blue-600": item.status === "ON_THE_WAY",
                      "border-purple-600": item.status === "DELIVERED",
                    })}
                  >
                    {item.status}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                  <OrderTableActions item={item} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
