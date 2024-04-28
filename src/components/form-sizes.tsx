"use client";

import { Size } from "@prisma/client";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition } from "react";
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
import { createSize } from "@/actions/sizes/create-size";
import { updateSize } from "@/actions/sizes/update-size";
import UpdateSizeAlert from "./models/update-size-alert";
import { deleteSize } from "@/actions/sizes/delete-size";

interface FormSizesProps {
  sizes: Size[] | null;
  id: string;
}

export default function FormSizes({ sizes, id }: FormSizesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState<Size | null>(null);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const [isDeletedLoading, startTransaction] = useTransition();

  const onDelete = async (sizeId: string) => {
    startTransaction(async () => {
      try {
        await deleteSize(sizeId);
        toast.success("Size created successfully");
        setIsDeleteOpen(false);
      } catch (error) {
        console.log("onSubmit size page:", error);
      }
    });
  };

  return (
    <>
      <SizeAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        productId={id}
      />
      <UpdateSizeAlert
        currentSize={currentSize as any}
        isOpen={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
        onClose={() => setIsOpenUpdate(false)}
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
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSize(size);
                    setIsOpenUpdate(true);
                  }}
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleteOpen(true);
                    setSelectedSize(size.id);
                  }}
                  className="px-2"
                  variant="destructive"
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
