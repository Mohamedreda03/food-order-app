"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaginationButtons({
  url,
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: string | number;
  url: string;
}) {
  const [page, setPage] = useState(Number(currentPage) || 1);
  const size = 10;

  const router = useRouter();

  const handleNext = () => {
    setPage((prev) => prev + 1);
    router.push(`/admin/${url}?page=${page + 1}&size=${size}`);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
    router.push(`/admin/${url}?page=${page - 1}&size=${size}`);
  };

  return (
    <>
      {pageCount > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 text-white bg-primary rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {pageCount &&
            Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  router.push(`/admin/${url}?page=${i + 1}&size=${size}`);
                }}
                className={cn(
                  `px-4 py-2 text-gray-900 border-2 border-primary/50 rounded-md`,
                  i + 1 === page
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                )}
              >
                {i + 1}
              </button>
            ))}

          <button
            disabled={page === pageCount}
            onClick={handleNext}
            className="px-4 py-2 text-white bg-primary rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
