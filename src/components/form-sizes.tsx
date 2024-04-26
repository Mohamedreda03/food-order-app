"use client";

import { Size } from "@prisma/client";
import { Button } from "./ui/button";
import { useState } from "react";
import SizeAlert from "./models/size-alert";
import { fCurrency } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { SizeFormTypes } from "@/types/schema";
import toast from "react-hot-toast";
import {
  useCreateSizeMutation,
  useDeleteSizeMutation,
} from "@/rtk/features/products/productsApislice";
import { Trash } from "lucide-react";
import DeleteAlert from "./models/delete-alert";
import { useParams } from "next/navigation";
import { set } from "date-fns";

interface FormSizesProps {
  sizes: Size[] | null;
  id: string;
}

export default function FormSizes({ sizes, id }: FormSizesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [createSize, { isLoading }] = useCreateSizeMutation();
  const [deleteSize, { isLoading: isDeletedLoading }] = useDeleteSizeMutation();

  const form = useForm<SizeFormTypes>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (data: SizeFormTypes) => {
    try {
      await createSize({ id, data });
      toast.success("Size created successfully");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log("onSubmit size page:", error);
    }
  };

  const onDelete = async (sizeId: string) => {
    try {
      await deleteSize({ id, sizeId });
      toast.success("Size created successfully");
      form.reset();
      setIsDeleteOpen(false);
    } catch (error) {
      console.log("onSubmit size page:", error);
    }
  };

  return (
    <>
      <SizeAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
        onSubmit={onSubmit}
        form={form}
      />
      <DeleteAlert
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        isLoading={isDeletedLoading}
        onDelete={() => onDelete(selectedSize as string)}
        title="Delete Size"
        description="Are you sure you want to delete this size?"
      />
      <div className="w-full flex flex-col gap-2 rounded-md">
        <h5>Size</h5>
        <div className="border border-gray-200 rounded-md min-h-20 p-3 flex flex-col gap-3">
          {sizes?.map((size) => (
            <div
              key={size.id}
              className="border p-3 rounded-md flex items-center justify-between"
            >
              <div>
                <h6 className="text-gray-800 text-lg">{size.name}</h6>
                <p className="text-gray-600">{fCurrency.format(size.price)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" type="button">
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setIsDeleteOpen(true);
                    setSelectedSize(size.id);
                  }}
                  className="px-2"
                  variant="destructive"
                  type="button"
                >
                  <Trash size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsOpen(true)} type="button">
          Add Size
        </Button>
      </div>
    </>
  );
}
