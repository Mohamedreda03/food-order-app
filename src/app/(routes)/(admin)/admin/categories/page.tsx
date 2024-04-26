"use client";

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
import { CategoryFormTypes, CategorySchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";
import CategoriesTable from "@/components/tables/table-categories";
import {
  useCategoriesPaginationQuery,
  useCreateCategoryMutation,
} from "@/rtk/features/categories/categoriesApiSlice";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const [createCategory, { isLoading: isCreateCategoryLoading }] =
    useCreateCategoryMutation();

  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "10");

  const { data, isLoading } = useCategoriesPaginationQuery({ page, size });

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const onSubmit = async (data: CategoryFormTypes) => {
    try {
      await createCategory(data);
      toast.success("Category created successfully");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log("onSubmit categories page:", error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Alert
        title="Create Category"
        description=""
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateCategoryLoading}
                      placeholder="category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isCreateCategoryLoading}
              type="submit"
              className="w-full"
            >
              Create Category
            </Button>
          </form>
        </Form>
      </Alert>
      <div className="wrapper flex flex-col my-14 gap-6 min-h-[600px]">
        <div className="mb-3">
          <Button onClick={() => setIsOpen(true)}>
            <CirclePlus size={20} className="mr-2" /> Create Category
          </Button>
        </div>
        <Separator />
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <CategoriesTable tableBody={data?.data} />
        </div>
        <PaginationButtons pageCount={data?.count} url="categories" />
      </div>
    </>
  );
}
