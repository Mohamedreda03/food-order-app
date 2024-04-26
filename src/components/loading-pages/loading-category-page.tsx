import React from "react";

export default function LoadingCategoryPage() {
  return (
    <div className="wrapper py-24">
      <div className="flex  animate-pulse">
        <div className="flex-[0.4] flex flex-col items-center">
          <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />

          <div className="mt-5 bg-gray-200 px-5 py-2 rounded-lg cursor-pointer h-[50px] w-[150px]" />
        </div>
        <div className="flex-[1.6]">
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <div className="h-[20px] w-32 bg-gray-200 rounded-md" />
              <div className="h-[40px] w-[400px] bg-gray-200 rounded-md" />
            </div>

            <div className="h-[40px] bg-gray-200 rounded-md w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
