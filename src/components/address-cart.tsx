"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { AddressFormTypes } from "@/types/schema";
import { useEffect, useState, useTransition } from "react";
import { updateUserProfile } from "@/actions/profile/update-user-profile";
import toast from "react-hot-toast";
import { getUserProfile } from "@/actions/profile/get-user-profile";
import { useSession } from "next-auth/react";
import { fCurrency } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useCart, { type CartItem } from "@/hooks/use-cart";

const AddressCart = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPandingUpdate, startTransitionUpdate] = useTransition();
  const [isPandingGetAddress, startTransitionGetAddress] = useTransition();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const cart = useCart();

  const total = cart.items.reduce((acc, item: CartItem) => {
    return acc + Number(item.item.price) * item.quantity!;
  }, 0);

  const { data } = useSession();

  const form = useForm<AddressFormTypes>({
    defaultValues: {
      tel: "",
      street_address: "",
      post_code: "",
      city: "",
      country: "",
    },
  });

  useEffect(() => {
    handleGetAddress();
  }, [data?.user.id]);

  const handleGetAddress = async () => {
    startTransitionGetAddress(async () => {
      try {
        const user: any = await getUserProfile();
        setUser(user);
        form.reset({
          tel: user.tel,
          street_address: user.street_address,
          post_code: user.post_code,
          city: user.city,
          country: user.country,
        });
        console.log(user);
      } catch (error) {
        console.log("handleGetAddress on Address page:", error);
      }
    });
  };

  const handleCheckout = async () => {
    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cart.items }),
        }
      );

      const data = await res.json();
      router.replace(data.url);
    });
  };

  const onSubmit = async (data: any) => {
    startTransitionUpdate(async () => {
      try {
        await updateUserProfile(data as any);
        toast.success("Address updated successfully");
        handleGetAddress();
      } catch (error) {
        console.log("onSubmit on Address page:", error);
      }
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Card className="flex flex-col gap-4 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPandingUpdate || isPandingGetAddress}
                        placeholder="phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPandingUpdate || isPandingGetAddress}
                        placeholder="street address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full gap-4">
                <FormField
                  control={form.control}
                  name="post_code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Post code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPandingUpdate || isPandingGetAddress}
                          placeholder="post code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPandingUpdate || isPandingGetAddress}
                          placeholder="phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPandingUpdate || isPandingGetAddress}
                        placeholder="country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPandingUpdate} type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </Card>
      <Card className="flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-2xl font-medium">Order Summary</h2>
          <p className="text-muted-foreground mb-4">
            Your cart total and shipping options
          </p>
        </div>

        <div className="flex items-center justify-between text-xl font-medium">
          <span>Total</span>
          <span>{fCurrency.format(total)}</span>
        </div>
        <Button
          disabled={
            isPending ||
            user?.tel === null ||
            user?.street_address === null ||
            user?.post_code === null ||
            user?.city === null ||
            user?.country === null ||
            user === null
          }
          onClick={handleCheckout}
          className="rounded-full w-full"
        >
          <LoaderCircle
            className={`w-5 h-5 animate-spin mr-2 ${
              isPending ? "block" : "hidden"
            }`}
          />
          Checkout
        </Button>
      </Card>
    </>
  );
};

export default AddressCart;
