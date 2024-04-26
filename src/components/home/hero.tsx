import { FaArrowRight } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full min-h-[500px] bg-orange-100 rounded-lg flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome <span className="text-primary">to</span> Cucina
        </h1>
        <p className="text-xl text-muted-foreground text-center">
          Discover the flavors of World
        </p>
        <Link href="/menu">
          <Button className="flex items-center gap-2">
            <span>GO TO MENU</span>
            <FaArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
