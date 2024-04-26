"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const navData = [
  {
    id: 1,
    label: "Home",
    link: "/",
  },
  {
    id: 2,
    label: "Menu",
    link: "/menu",
  },
  {
    id: 3,
    label: "About",
    link: "/about",
  },
  {
    id: 4,
    label: "Contact",
    link: "/contact",
  },
];

export default function MobileNavLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav>
      <ul className="flex items-center gap-6 font-medium flex-col">
        {navData.map((item) => {
          const isActive = item.link === pathname;
          return (
            <li key={item.id} className="flex w-full ml-6 text-lg">
              <Link
                href={item.link}
                className={cn(isActive && "text-orange-500", "w-full")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="w-full">
          <Link href="/profile">
            <Button variant="default" className="text-md text-gray-700">
              {session?.user?.name}
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
