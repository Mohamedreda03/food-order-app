"use client";

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
import { ProductFormTypes } from "@/types/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Product, Size } from "@prisma/client";
import FormSizes from "@/components/form-sizes";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import UploadWidget from "@/components/upload-widget";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductSizes } from "@/actions/sizes/get-product-sizes";
import { updateProduct } from "@/actions/products/update-product";

/**
 * () get product
 * () get categories
 * () get sizes
 *
 * () update product
 * () update sizes
 *
 */

interface UpdateProductFromProps {
  product: Product & { sizes: Size[] };
  categories: Category[];
}

export default function UpdateProductFrom({
  product,
  categories,
}: UpdateProductFromProps) {
  const [image, setImage] = useState<string | null>(null);
  const [save, setSave] = useState<boolean>(false);
  const [sizes, setSizes] = useState<Size[]>([]);

  const [isPeindingGetSizes, startTransactionGetSizes] = useTransition();

  useEffect(() => {
    handleGetSizes();
  }, [product]);

  const handleGetSizes = async () => {
    startTransactionGetSizes(async () => {
      try {
        const data = await getProductSizes(product?.id);
        setSizes(data as Size[]);
      } catch (error) {
        console.log("handleGetSizes on Profile page:", error);
      }
    });
  };

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      image: product?.image || null,
      description: product?.description || "",
      categoryId: product?.categoryId || "",
      best_seller: product?.best_seller,
    },
  });

  useEffect(() => {}, [image]);

  const onSubmit = async (data: ProductFormTypes) => {
    try {
      await updateProduct(product?.id, data);
    } catch (error) {
      console.log("onSubmit on Profile page:", error);
    } finally {
      toast.success("Product updated successfully");
      setSave(true);
      setTimeout(() => {
        setSave(false);
      }, 5000);
    }
  };

  const handleUploadSuccess = (result: any) => {
    form.setValue("image", result?.info.secure_url);
    setImage(result?.info.secure_url);
  };

  return (
    <>
      {save && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p className="font-bold">Saved!</p>
        </div>
      )}

      <div className="flex gap-6 flex-col md:flex-row w-full">
        <div className="flex-[0.4] flex flex-col items-center">
          {form.getValues("image") ? (
            <Image
              src={form.getValues("image") as string}
              priority={true}
              width={180}
              height={200}
              className="rounded-md object-cover w-[180px] h-[200px]"
              alt="profile"
            />
          ) : (
            <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
          )}

          <UploadWidget
            handleUploadSuccess={handleUploadSuccess}
            title="Update Image"
          />
        </div>

        <div className="flex-[1.6]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Item name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPeindingGetSizes}
                          placeholder="user name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPeindingGetSizes}
                            placeholder="item price"
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
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          disabled={isPeindingGetSizes}
                          onValueChange={field.onChange}
                          defaultValue={product?.categoryId}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a category"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent defaultValue={product?.id}>
                            {categories?.map((category: Category) => (
                              <SelectItem
                                key={category?.id}
                                value={category?.id}
                              >
                                {category?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3 items-start justify-center">
                  <div className="w-full flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[200px]"
                              disabled={isPeindingGetSizes}
                              {...field}
                              placeholder="Type Description for this item."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="border border-gray-200 p-3 rounded-md">
                      <FormField
                        control={form.control}
                        name="best_seller"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value as any}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-md">
                                Is Best Seller
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormSizes sizes={sizes} id={product?.id} />
                </div>
              </div>
              <Button
                disabled={isPeindingGetSizes}
                type="submit"
                className="w-full sm:w-[150px]"
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
