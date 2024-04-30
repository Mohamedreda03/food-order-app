import PaginationButtons from "@/components/pagination-buttons";
import UsersTable from "@/components/tables/table-users";
import { getUsersPagination } from "@/actions/users/get-users-pagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const data = await getUsersPagination(searchParams.page, searchParams.size);

  return (
    <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
      <div className="border-2 border-gray-200 p-3 rounded-md">
        <UsersTable tableBody={data?.data} />
      </div>
      <PaginationButtons
        currentPage={searchParams.page}
        pageCount={data?.count ?? 1}
        url="users"
      />
    </div>
  );
}
