"use client";

import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetUserQuery,
  useUpdateAuthUserMutation,
  useUpdateUserMutation,
} from "@/rtk/features/users/usersApiSlice";
import LoadingProfile from "@/components/profile/loading-profile";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UserPage() {
  const [save, setSave] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { userId } = useParams();

  const { data: user, isLoading } = useGetUserQuery({
    id: userId,
  });
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const onSubmit = async () => {
    try {
      const data = {
        id: userId,
        data: {
          isAdmin: isAdmin,
        },
      };
      await updateUser(data);
      setSave(true);

      setTimeout(() => {
        setSave(false);
      }, 3000);
    } catch (error) {
      console.log("onSubmit on User page:", error);
    }
  };

  if (isLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      {isUpdateUserLoading && <Loading />}
      <div className="py-20 wrapper">
        {save && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p className="font-bold">Saved!</p>
          </div>
        )}
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="flex-[0.4] flex flex-col items-center">
            {user?.data?.image ? (
              <Image
                src={user?.data?.image}
                priority={true}
                width={180}
                height={200}
                className="rounded-md object-cover w-[180px] h-[200px]"
                alt="profile"
              />
            ) : (
              <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
            )}
          </div>
          <div className="flex flex-col gap-2 text-lg">
            <table className="w-[400px]">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Name
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Email
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Country
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.country || "No Country"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      City
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.city || "No City"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Post Code
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.post_code || "No Post Code"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Street Address
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.street_address || "No Street Address"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Phone
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.street_address || "No Phone"}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-2">
              <Checkbox
                defaultChecked={user?.data?.isAdmin}
                onCheckedChange={(e) => {
                  setIsAdmin(e.valueOf() as boolean);
                }}
              />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is Admin
              </label>
            </div>
            <Button onClick={onSubmit} type="button" className="w-[200px]">
              Update Role
            </Button>
          </div>
          <div className="flex-[1.6]"></div>
        </div>
      </div>
    </>
  );
}
