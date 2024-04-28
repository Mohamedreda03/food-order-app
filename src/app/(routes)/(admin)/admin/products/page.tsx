import { Separator } from "@/components/ui/separator";
import ProductsTable from "@/components/tables/table-products";
import PaginationButtons from "@/components/pagination-buttons";
// import { getProductsPagination } from "@/actions/get-products-pagination";
import CreateProductAlertFrom from "./_components/create-product-alert-from";
import { getProductsPagination } from "@/actions/products/get-products-pagination";

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
    next: { tags: ["categories", "products"] },
  });
  const data = await res.json();
  return data;
};

// const getProductsPagination = async (page: string, size: string) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/products/pagination?page=${page}&size=${size}`,
//     {
//       next: { tags: ["products"] },
//     }
//   );
//   const data = await res.json();
//   return data;
// };

export default async function ProductsPage({
  searchParams: pageParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const categories = await getCategories();

  const data = await getProductsPagination(pageParams.page, pageParams.size);

  return (
    <>
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <CreateProductAlertFrom categories={categories?.data} />
        <Separator />
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <ProductsTable tableBody={data?.data as any} />
        </div>
        <PaginationButtons pageCount={data?.count as number} url="products" />
      </div>
    </>
  );
}
