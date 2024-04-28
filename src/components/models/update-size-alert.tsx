import { updateSize } from "@/actions/sizes/update-size";
import Alert from "../alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SizeFormTypes } from "@/types/schema";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useTransition } from "react";

interface DeleteAlertProps {
  isOpen: boolean;
  setIsOpenUpdate: (value: boolean) => void;
  onClose: () => void;
  currentSize: Size;
}

export default function UpdateSizeAlert({
  isOpen,
  setIsOpenUpdate,
  onClose,
  currentSize,
}: DeleteAlertProps) {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<SizeFormTypes>({
    defaultValues: {
      name: currentSize?.name || "",
      price: currentSize?.price || 0,
    },
  });

  useEffect(() => {
    if (currentSize) {
      form.reset({
        name: currentSize?.name,
        price: currentSize?.price,
      });
    }
  }, [form, currentSize]);

  const onUpdate = async (data: SizeFormTypes) => {
    startTransition(async () => {
      try {
        await updateSize(currentSize?.id!, data);
        toast.success("Size updated successfully");
        setIsOpenUpdate(false);
        form.reset();
      } catch (error) {
        console.log("onUpdate size page:", error);
      }
    });
  };
  return (
    <Alert title="Update Size" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={isLoading}
                      placeholder="size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      disabled={isLoading}
                      placeholder="size price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onUpdate(form.getValues());
            }}
            disabled={isLoading}
            type="button"
            className="w-full"
          >
            Update Size
          </Button>
        </form>
      </Form>
    </Alert>
  );
}
