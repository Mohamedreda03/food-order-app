"use client";

import { useSearchParams } from "next/navigation";

import { CirclePlus } from "lucide-react";
import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormTypes, ProductSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";

import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsTable from "@/components/tables/table-products";
import {
  useCreateProductMutation,
  useProductsPaginationQuery,
} from "@/rtk/features/products/productsApislice";
import { useGetAllCategoriesQuery } from "@/rtk/features/categories/categoriesApiSlice";
import PaginationButtons from "@/components/pagination-buttons";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories } = useGetAllCategoriesQuery({});
  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();

  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "10");

  const { data, isLoading } = useProductsPaginationQuery({ page, size });

  const form = useForm<ProductFormTypes>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      sizes: [""],
      image: null,
    },
  });

  const onSubmit = async (data: ProductFormTypes) => {
    try {
      await createProduct(data);
    } catch (error) {
      console.log("onSubmit on Products page:", error);
    } finally {
      toast.success("Category created successfully");
      form.reset();
      setIsOpen(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Alert
        title="Create Item"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateProductLoading}
                      placeholder="item name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateProductLoading}
                      placeholder="item description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateProductLoading}
                      placeholder="item Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isCreateProductLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isCreateProductLoading}
              type="submit"
              className="w-full"
            >
              Create Item
            </Button>
          </form>
        </Form>
      </Alert>
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <div className="mb-3">
          <Button onClick={() => setIsOpen(true)}>
            <CirclePlus size={20} className="mr-2" /> Create Item
          </Button>
        </div>
        <Separator />
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <ProductsTable tableBody={data?.data} />
        </div>
        <PaginationButtons pageCount={data?.size} url="products" />
      </div>
    </>
  );
}
