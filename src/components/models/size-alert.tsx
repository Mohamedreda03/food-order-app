import { createSize } from "@/actions/sizes/create-size";
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
import { useTransition } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface DeleteAlertProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  productId: string;
}

export default function SizeAlert({
  isOpen,
  onClose,
  setIsOpen,
  productId,
}: DeleteAlertProps) {
  const [isLoading, startCreateSizeTransition] = useTransition();

  const form = useForm<SizeFormTypes>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = async (data: SizeFormTypes) => {
    startCreateSizeTransition(async () => {
      try {
        await createSize(productId, data);
        toast.success("Size created successfully");
        setIsOpen(false);
        form.reset();
      } catch (error) {
        console.log("onSubmit size page:", error);
      }
    });
  };

  return (
    <Alert title="Create Size" isOpen={isOpen} onClose={onClose}>
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
              onSubmit(form.getValues());
            }}
            disabled={isLoading}
            type="button"
            className="w-full"
          >
            Create Size
          </Button>
        </form>
      </Form>
    </Alert>
  );
}
