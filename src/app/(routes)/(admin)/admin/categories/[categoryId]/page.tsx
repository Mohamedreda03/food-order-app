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
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CategoryFormTypes, CategorySchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingCategoryPage from "@/components/loading-pages/loading-category-page";
import UploadWidget from "@/components/upload-widget";
import { getCategory } from "@/actions/categories/get-category";
import { updateCategory } from "@/actions/categories/update-category";

export default function SingleCategoryPage() {
  const [image, setImage] = useState<string | null>(null);

  const [isLoading, startTransition] = useTransition();
  const [isLoadingUpdate, startTransitionUpdate] = useTransition();

  const params: { categoryId: string } = useParams();

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    startTransition(async () => {
      try {
        const data: any = await getCategory(params.categoryId as string);

        form.setValue("name", data?.name);
        form.setValue("image", data?.image);
      } catch (error) {
        console.log("GET CATEGORY ACTION:", error);
      }
    });
  };

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const onSubmit = async (data: any) => {
    startTransitionUpdate(async () => {
      try {
        await updateCategory(params.categoryId, data);
        toast.success("Category updated successfully");
      } catch (error) {
        console.log("UPDATE CATEGORY ACTION:", error);
      }
    });
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
                          disabled={isLoadingUpdate}
                          placeholder="category name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoadingUpdate}
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
