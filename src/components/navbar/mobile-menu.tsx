"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

export default function MobileMenu() {
  const pathname = usePathname();
  return (
    <div className="md:hidden flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="h-10 w-10" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-20">
            <ul className="flex items-center gap-6 font-medium flex-col">
              {navData.map((item) => {
                const isActive = item.link === pathname;
                return (
                  <li key={item.id} className="flex w-full ml-6 text-lg">
                    <SheetClose asChild>
                      <Link
                        href={item.link}
                        className={cn(isActive && "text-orange-500", "w-full")}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
