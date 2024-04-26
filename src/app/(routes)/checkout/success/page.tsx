import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div>
      <div className="wrapper min-h-[700px] py-52">
        <div className="flex flex-col gap-7 items-center justify-center text-5xl text-green-500 font-bold mb-4">
          <CircleCheckBig className="h-24 w-24 text-green-500" />
          <div>Checkout Success</div>
          <Link href="/">
            <Button variant="outline" className="rounded-full text-gray-900">
              Continue Shopping &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
