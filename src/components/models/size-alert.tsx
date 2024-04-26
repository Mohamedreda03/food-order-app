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
import { UseFormReturn } from "react-hook-form";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  onSubmit: (data: SizeFormTypes) => void;
  form: UseFormReturn<{ name: string; price: number }, any, undefined>;
}

export default function SizeAlert({
  isOpen,
  onClose,
  isLoading,
  onSubmit,
  form,
}: DeleteAlertProps) {
  return (
    <Alert title="Create Size" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
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
          <Button disabled={isLoading} type="submit" className="w-full">
            Create Size
          </Button>
        </form>
      </Form>
    </Alert>
  );
}
