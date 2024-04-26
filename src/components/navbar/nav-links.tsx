"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

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
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6 text-lg font-medium flex-col md:flex-row w-full">
        {navData.map((item) => {
          const isActive = item.link === pathname;
          return (
            <li key={item.id}>
              <Link
                href={item.link}
                className={cn(isActive && "text-orange-500")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
