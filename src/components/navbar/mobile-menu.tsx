"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import MobileNavLinks from "./mobile-nav-links";

export default function MobileMenu() {
  return (
    <div className="md:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-10 w-10" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-20">
            <MobileNavLinks />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
