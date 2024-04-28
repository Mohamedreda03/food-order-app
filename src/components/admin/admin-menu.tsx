"use client";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

type AdminMenuType = {
  title: string;
  href: string;
};

const AdminMenuLinks: AdminMenuType[] = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
];

export default function AdminMenu() {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <div className="max-w-screen-md mx-auto mt-6 flex items-center justify-center">
      {data?.user?.isAdmin && (
        <div className="flex items-center justify-center bg-secondary p-2 rounded-md">
          {AdminMenuLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                `block py-2 px-4 text-gray-600 rounded-md md:mx-1`,
                {
                  "bg-primary text-white": pathname.includes(link.href),
                },
                {
                  "hover:bg-orange-200": !pathname.includes(link.href),
                },
                {
                  "hidden md:block": "/profile" === link.href,
                }
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
