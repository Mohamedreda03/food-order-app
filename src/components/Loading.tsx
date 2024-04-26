// export default function Loading() {
//   return (
//     <div className="fixed inset-0 bg-gray-300/50 flex items-center justify-center">
//       <div className="flex items-center justify-center flex-col gap-3">
//         <h1 className="text-gray-800 text-6xl font-semibold">
//           <span className="text-primary">PI</span>ZZA
//         </h1>
//         <h1 className="text-5xl text-gray-600 font-medium">Loading...</h1>
//       </div>
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="absolute inset-0 bg-gray-300/50 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <h1 className="text-gray-800 text-6xl font-semibold">
          <span className="text-primary">PI</span>ZZA
        </h1>
        <h1 className="text-5xl text-gray-600 font-medium">Loading...</h1>
      </div>
    </div>
  );
}
