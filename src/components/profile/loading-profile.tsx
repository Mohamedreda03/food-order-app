export default function LoadingProfile() {
  return (
    <>
      <div className="py-20 wrapper">
        <div className="flex gap-6 flex-col md:flex-row animate-pulse">
          <div className="flex-[0.4] flex flex-col items-center">
            <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
            <div className="mt-5 border h-[50px] w-[150px] bg-gray-200 px-5 py-2 rounded-lg cursor-pointer" />
          </div>
          <div className="flex-[1.6]">
            <div className="space-y-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-10 bg-gray-200 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-10 bg-gray-200 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-10 bg-gray-200 rounded-md" />
                </div>
                <div className="flex w-full gap-4">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="h-5 w-32 bg-gray-200 rounded-md" />
                    <div className="h-10 bg-gray-200 rounded-md" />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="h-5 w-32 bg-gray-200 rounded-md" />
                    <div className="h-10 bg-gray-200 rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-32 bg-gray-200 rounded-md" />
                  <div className="h-10 bg-gray-200 rounded-md" />
                </div>

                <div className="w-full sm:w-[150px]">
                  <div className="h-10 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
