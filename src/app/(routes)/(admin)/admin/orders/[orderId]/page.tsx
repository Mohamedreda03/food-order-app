"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { cn, fCurrency } from "@/lib/utils";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "@/rtk/features/orders/orderSlice";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const { data: order, isLoading } = useGetOrderQuery({ id: params.orderId });
  const [updateOrder, { isLoading: isLoadingUpdateOrder }] =
    useUpdateOrderMutation();

  return (
    <>
      {(isLoading || isLoadingUpdateOrder) && <Loading />}
      <div className="wrapper py-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[700px] w-full">
          <h1 className="text-2xl font-bold text-primary">Order Details</h1>
          {order && (
            <div className="flex gap-4 mt-4 w-full">
              <div className="flex flex-col gap-2 text-lg max-w-[700px] w-full">
                <div>
                  {order?.data?.status === "PAID" && (
                    <Button
                      onClick={() =>
                        updateOrder({
                          id: order.data.id,
                          data: { status: "ON_THE_WAY" },
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-500"
                    >
                      ON THE WAY
                    </Button>
                  )}
                  {order?.data?.status === "ON_THE_WAY" && (
                    <Button
                      onClick={() =>
                        updateOrder({
                          id: order.data.id,
                          data: { status: "DELIVERED" },
                        })
                      }
                      className="bg-purple-600 hover:bg-purple-500"
                    >
                      DELIVERED
                    </Button>
                  )}
                </div>
                <table className="w-full table-caption border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          userId
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.userId || ""}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Email
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.user?.email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Status
                        </label>
                      </td>
                      <td
                        className={cn(
                          `whitespace-nowrap px-4 border-b border-gray-200`,

                          {
                            "text-green-600": order?.data?.status === "PAID",
                            "text-red-600": order?.data?.status === "FAILED",
                            "text-yellow-600":
                              order?.data?.status === "PENDING",
                            "text-blue-600":
                              order?.data?.status === "ON_THE_WAY",
                            "text-purple-600":
                              order?.data?.status === "DELIVERED",
                          }
                        )}
                      >
                        <div
                          className={cn(
                            `border w-fit text-sm rounded-full px-3`,
                            {
                              "border-green-600":
                                order?.data?.status === "PAID",
                              "border-red-600":
                                order?.data?.status === "FAILED",
                              "border-yellow-600":
                                order?.data?.status === "PENDING",
                              "border-blue-600":
                                order?.data?.status === "ON_THE_WAY",
                              "border-purple-600":
                                order?.data?.status === "DELIVERED",
                            }
                          )}
                        >
                          {order?.data?.status}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Country
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.user?.country || "No Country"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          City
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.user?.city || "No City"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Post Code
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.user?.post_code || "No Post Code"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Street Address
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>
                          {order?.data?.user?.street_address ||
                            "No Street Address"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Phone
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.data?.user?.tel || "No Phone"}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-6">
                  <h2 className="text-2xl font-bold mb-2 flex items-center justify-center text-primary">
                    Items
                  </h2>
                  <div className="flex flex-col gap-5">
                    {order?.data?.items.map((item: any) => (
                      <div key={item.id} className="border p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div>
                            <div className="flex items-center gap-4">
                              <p>Name: {item.name}</p>|
                              <p>Price: {fCurrency.format(item.price)}</p>
                            </div>
                            <p>Size: {item.size}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
