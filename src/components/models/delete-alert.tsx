import Alert from "../alert";
import { Button } from "../ui/button";

interface DeleteAlertProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: any;
  isLoading?: boolean;
}

export default function DeleteAlert({
  title,
  description,
  isOpen,
  onClose,
  onDelete,
  isLoading,
}: DeleteAlertProps) {
  return (
    <Alert
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex justify-end gap-2">
        <Button disabled={isLoading} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={onDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </Alert>
  );
}
