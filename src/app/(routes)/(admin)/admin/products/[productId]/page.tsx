import UpdateProductFrom from "./_components/update-product-from";
import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getProduct } from "@/actions/products/get-product";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function ProfilePage({
  params,
}: {
  params: { productId: string };
}) {
  const session = await auth();
  const categories = await getAllCategories();
  const product = await getProduct(params.productId);

  return (
    <>
      <div className="py-20 wrapper flex flex-col">
        {!session?.user?.isAdmin && (
          <h2 className="flex items-center justify-center text-5xl font-medium text-primary mb-6">
            Profile
          </h2>
        )}

        <UpdateProductFrom
          categories={categories?.data as any}
          product={product as any}
        />
      </div>
    </>
  );
}
