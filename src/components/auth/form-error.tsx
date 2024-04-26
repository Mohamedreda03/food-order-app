export default function FormError({ message }: { message: string }) {
  return (
    <div className="w-full h-11 border border-red-500 rounded-md flex items-center justify-center bg-red-100">
      <p className="text-red-600">{message}</p>
    </div>
  );
}
