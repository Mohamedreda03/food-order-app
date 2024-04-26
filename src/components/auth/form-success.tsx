export default function FormSuccess({ message }: { message: string }) {
  return (
    <div className="w-full h-11 border border-green-500 rounded-md flex items-center justify-center bg-green-100">
      <p className="text-green-600">{message}</p>
    </div>
  );
}
