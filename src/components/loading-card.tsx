import React from "react";

export default function LoadingCard() {
  return (
    <div className="border p-5 shadow-md shadow-gray-100 rounded-md flex items-center flex-col animate-pulse min-w-[200px]">
      <div className="rounded-md mb-4 h-[200px] w-full bg-slate-100 flex flex-col items-center justify-center"></div>

      <div className="flex items-center justify-between w-full">
        <h3 className="text-gray-900 w-[100px] h-5 bg-slate-100"></h3>
        <p className="text-gray-900 w-[100px] h-5 bg-slate-100"></p>
      </div>
      <div className="rounded-full flex items-center justify-center w-full h-11 my-4 bg-slate-100" />
    </div>
  );
}
