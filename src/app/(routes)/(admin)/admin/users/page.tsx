"use client";

import { useSearchParams } from "next/navigation";

import { useUserPaginationQuery } from "@/rtk/features/users/usersApiSlice";

import Loading from "@/components/Loading";
import PaginationButtons from "@/components/pagination-buttons";
import UsersTable from "@/components/tables/table-users";

export default function ProductsPage({}: {}) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "10");

  const { data, isLoading } = useUserPaginationQuery({ page, size });

  return (
    <>
      {isLoading && <Loading />}
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <UsersTable tableBody={data?.data} />
        </div>
        <PaginationButtons pageCount={data?.count} url="users" />
      </div>
    </>
  );
}
