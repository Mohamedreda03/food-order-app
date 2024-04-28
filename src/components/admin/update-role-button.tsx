"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useState } from "react";
import { updateUser } from "@/actions/users/delete-user";

const UpdateRoleButton = ({ userId, user }: { userId: string; user: User }) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const onSubmit = async () => {
    try {
      const data = {
        id: userId,
        data: {
          isAdmin: isAdmin,
        },
      };
      await updateUser(user.id, data);
    } catch (error) {
      console.log("onSubmit on User page:", error);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-2">
        <Checkbox
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
      <Button onClick={onSubmit} type="button" className="w-[200px]">
        Update Role
      </Button>
    </>
  );
};

export default UpdateRoleButton;
