"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Clipboard, Trash2 } from "lucide-react";
import DeleteAlert from "../models/delete-alert";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteUser } from "@/actions/users/delete-user";

interface TableProps {
  tableBody?: User[];
}

const tableHead = ["Image", "Name", "Role", "Email", "Actions"];

export default function UsersTable({ tableBody }: TableProps) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState<string | null>(null);
  // const [isLoading, startTransition] = useTransition();
  // const router = useRouter();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Email copied.");
  };

  // const onDelete = async () => {
  //   startTransition(async () => {
  //     try {
  //       await deleteUser(currentUser as string);
  //     } catch (error) {
  //       console.log("onDelete on user page:", error);
  //     } finally {
  //       router.refresh();
  //       setIsOpen(false);
  //       toast.success("user deleted successfully");
  //     }
  //   });
  // };

  return (
    <>
      {/* <DeleteAlert
        title="Delete"
        description="Are you sure you want to delete this user?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={onDelete}
        isLoading={isLoading}
      /> */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {tableHead.map((head, i) => (
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
                <td className="whitespace-nowrap px-4 flex items-center justify-center py-2 font-medium text-gray-900">
                  {item.image ? (
                    <Image
                      src={item.image}
                      height={50}
                      width={50}
                      className="h-[50px] w-[50px] object-cover rounded-md"
                      alt="image"
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
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.isAdmin ? "Admin" : "User"}
                </td>

                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.email}
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => onCopy(item.email as string)}
                      className="px-2"
                      variant="outline"
                    >
                      <Clipboard size={20} />
                    </Button>
                    <Link href={`/admin/users/${item.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    {/* <Button
                      onClick={() => {
                        setCurrentUser(item.id);
                        setIsOpen(true);
                      }}
                      className="px-2"
                      variant="destructive"
                    >
                      <Trash2 size={20} />
                    </Button> */}
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
