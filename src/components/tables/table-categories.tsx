"use client";

import { Category } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Clipboard, Trash2 } from "lucide-react";
import DeleteAlert from "../models/delete-alert";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCategory } from "@/actions/categories/delete-category";

interface TableProps {
  tableBody?: Category[];
}

const tableHead = ["Image", "Name", "ID", "Actions"];

export default function CategoriesTable({ tableBody }: TableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("copied.");
  };

  const onDelete = async () => {
    startTransition(async () => {
      try {
        const res = await deleteCategory(currentItem as string);

        if (res?.error) {
          setIsOpen(false);
          toast.error("Category has products, can't delete.");
          return;
        }
        router.refresh();
        setIsOpen(false);

        toast.success("Category deleted successfully");
      } catch (error) {
        console.log("Category DELETE:", error);
      }
    });
  };

  return (
    <>
      <DeleteAlert
        title="Delete"
        description="Are you sure you want to delete this item?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={onDelete}
        isLoading={isLoading}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {tableHead?.map((head, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-lg"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {tableBody?.map((item) => (
            <tbody key={item.id} className="divide-y divide-gray-200">
              <tr className="text-center">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex justify-center items-center">
                  {item?.image ? (
                    <Image
                      src={item?.image as string}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover h-[50px] w-[50px]"
                    />
                  ) : (
                    <div className="h-[50px] w-[50px] bg-gray-200 rounded-md text-sm flex flex-col items-center justify-center">
                      <span>No</span> Image
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.id}
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => onCopy(item.id)}
                      className="px-2"
                      variant="outline"
                    >
                      <Clipboard size={20} />
                    </Button>
                    <Link href={`/admin/categories/${item.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentItem(item.id);
                      }}
                      className="px-2"
                      variant="destructive"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
