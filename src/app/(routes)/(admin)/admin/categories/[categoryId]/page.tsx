"use client";

import { useParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryFormTypes, CategorySchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/rtk/features/categories/categoriesApiSlice";
import LoadingCategoryPage from "@/components/loading-pages/loading-category-page";
import UploadWidget from "@/components/upload-widget";

export default function SingleCategoryPage() {
  const [image, setImage] = useState<string | null>(null);

  const params = useParams();

  const [updateCategory, { isLoading: isUpdateCategoryLoading }] =
    useUpdateCategoryMutation();

  const {
    data: category,
    isLoading,
    isSuccess,
  } = useGetCategoryQuery(params.categoryId);

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      image: category?.image || "",
    },
  });

  const onSubmit = async (data: any) => {
    await updateCategory({ id: params.categoryId, data });
    toast.success("Category updated successfully");
  };

  const handleUploadSuccess = (result: any) => {
    form.setValue("image", result?.info.secure_url);
    setImage(result?.info.secure_url);
  };

  if (isLoading) {
    return <LoadingCategoryPage />;
  }

  return (
    <>
      <div className="wrapper py-24">
        <div className="flex">
          <div className="flex-[0.4] flex flex-col items-center">
            {form.getValues("image") ? (
              <Image
                src={form.getValues("image") as string}
                width={180}
                height={200}
                className="rounded-md object-cover h-[200px] w-[180px]"
                alt="profile"
              />
            ) : (
              <div className="h-[200px] w-[180px] bg-gray-200 rounded-md flex items-center justify-center text-lg font-medium text-gray-500">
                No Image
              </div>
            )}

            <UploadWidget
              handleUploadSuccess={handleUploadSuccess}
              title="Update Image"
            />
          </div>
          <div className="flex-[1.6]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[400px]"
                          disabled={isUpdateCategoryLoading}
                          placeholder="category name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isUpdateCategoryLoading}
                  type="submit"
                  className="w-[200px]"
                >
                  update Category
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
