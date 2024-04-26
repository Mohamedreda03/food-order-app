"use client";

import Loading from "@/components/Loading";
import PaginationButtons from "@/components/pagination-buttons";
import OrdersTable from "@/components/tables/table-orders";
import { useGetOrdersPaginationQuery } from "@/rtk/features/orders/orderSlice";
import { useSearchParams } from "next/navigation";

const OrdersPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "10");

  const { data: orders, isLoading } = useGetOrdersPaginationQuery({
    page,
    size,
  });

  return (
    <>
      {isLoading && <Loading />}
      <div className="wrapper flex flex-col gap-6 my-14 min-h-[600px]">
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <OrdersTable tableBody={orders?.data} />
        </div>
        <PaginationButtons pageCount={orders?.count} url="orders" />
      </div>
    </>
  );
};

export default OrdersPage;
