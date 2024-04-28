"use client";

import { createCategory } from "@/actions/categories/create-category";
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
import { CirclePlus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateCategoryAlertForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPeinding, startTransition] = useTransition();

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const onSubmit = async (data: CategoryFormTypes) => {
    startTransition(async () => {
      try {
        await createCategory(data);

        toast.success("Category created successfully");
        form.reset();
        setIsOpen(false);
      } catch (error) {
        console.log("onSubmit categories page:", error);
      }
    });
  };

  return (
    <>
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
                      disabled={isPeinding}
                      placeholder="category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPeinding} type="submit" className="w-full">
              Create Category
            </Button>
          </form>
        </Form>
      </Alert>
      <div className="mb-3">
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus size={20} className="mr-2" /> Create Category
        </Button>
      </div>
    </>
  );
};

export default CreateCategoryAlertForm;
