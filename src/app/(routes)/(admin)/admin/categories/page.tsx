import { Separator } from "@/components/ui/separator";
import CategoriesTable from "@/components/tables/table-categories";
import PaginationButtons from "@/components/pagination-buttons";
import CreateCategoryAlertForm from "./_components/create-category-alert-form";
import { getCategoriesPagination } from "@/actions/categories/get-categories-pagination";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const data = await getCategoriesPagination(
    searchParams.page,
    searchParams.size
  );

  return (
    <>
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <CreateCategoryAlertForm />
        <Separator />
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <CategoriesTable tableBody={data?.data} />
        </div>
        <PaginationButtons
          currentPage={searchParams.page as string}
          pageCount={data?.count as number}
          url="categories"
        />
      </div>
    </>
  );
}
