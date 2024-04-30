"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { updateUser } from "@/actions/users/update-user";
import toast from "react-hot-toast";

const UpdateRoleButton = ({ userId, user }: { userId: string; user: User }) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [isLoading, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        const data = {
          isAdmin: isAdmin,
        };
        await updateUser(userId, data);
        toast.success("Role updated successfully");
      } catch (error) {
        console.log("onSubmit on User page:", error);
      }
    });
  };

  return (
    <>
      <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-2">
        <Checkbox
          disabled={isLoading}
          defaultChecked={user?.isAdmin}
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
      <Button
        disabled={isLoading}
        onClick={onSubmit}
        type="button"
        className="w-[200px]"
      >
        Update Role
      </Button>
    </>
  );
};

export default UpdateRoleButton;
