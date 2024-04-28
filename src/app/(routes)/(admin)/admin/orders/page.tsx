import { getOrdersPagination } from "@/actions/orders/get-orders-pagination";
import PaginationButtons from "@/components/pagination-buttons";
import OrdersTable from "@/components/tables/table-orders";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) => {
  const orders = await getOrdersPagination(
    searchParams.page,
    searchParams.size
  );

  return (
    <>
      <div className="wrapper flex flex-col gap-6 my-14 min-h-[600px]">
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <OrdersTable tableBody={orders?.data as any} />
        </div>
        <PaginationButtons
          pageCount={orders?.count as number}
          currentPage={searchParams.page}
          url="orders"
        />
      </div>
    </>
  );
};

export default OrdersPage;
