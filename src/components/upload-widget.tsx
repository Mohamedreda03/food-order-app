import { CldUploadWidget } from "next-cloudinary";

interface UploadWidgetProps {
  title: string;
  handleUploadSuccess: any;
}

export default function UploadWidget({
  title,
  handleUploadSuccess,
}: UploadWidgetProps) {
  return (
    <CldUploadWidget onSuccess={handleUploadSuccess} uploadPreset="food_order">
      {({ open }) => {
        return (
          <button
            className="mt-5 border border-gray-300 px-5 py-2 rounded-lg cursor-pointer"
            onClick={() => open()}
          >
            {title}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
