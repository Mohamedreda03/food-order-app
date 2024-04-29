import { Separator } from "@/components/ui/separator";
import ProductsTable from "@/components/tables/table-products";
import PaginationButtons from "@/components/pagination-buttons";
import CreateProductAlertFrom from "./_components/create-product-alert-from";
import { getProductsPagination } from "@/actions/products/get-products-pagination";
import { getAllCategories } from "@/actions/categories/get-all-categories";

export const dynamic = "force-dynamic";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const categories = await getAllCategories();

  const data = await getProductsPagination(
    searchParams.page,
    searchParams.size
  );

  return (
    <>
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <CreateProductAlertFrom categories={categories?.data as any} />
        <Separator />
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <ProductsTable tableBody={data?.data as any} />
        </div>
        <PaginationButtons
          pageCount={data?.count as number}
          currentPage={searchParams.page}
          url="products"
        />
      </div>
    </>
  );
}
