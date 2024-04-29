"use client";

import Image from "next/image";
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
import { ProfileFormTypes } from "@/types/schema";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UploadWidget from "@/components/upload-widget";
import { updateUserProfile } from "@/actions/profile/update-user-profile";

const ProfileForm = ({ data }: { data: ProfileFormTypes }) => {
  const [isPandingUpdate, startTransitionUpdate] = useTransition();
  const [image, setImage] = useState<string | null>(data.image || null);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<ProfileFormTypes>({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      image: data?.image || "",
      tel: data?.tel || "",
      street_address: data?.street_address || "",
      post_code: data?.post_code || "",
      city: data?.city || "",
      country: data?.country || "",
    },
  });

  const onSubmit = async (data: ProfileFormTypes) => {
    startTransitionUpdate(async () => {
      try {
        await updateUserProfile(data as ProfileFormTypes);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("onSubmit on Profile page:", error);
      }
    });
  };

  const handleUploadSuccess = (result: any) => {
    form.setValue("image", result.info.secure_url);
    setImage(result.info.secure_url);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="flex-[0.4] flex flex-col items-center">
        {image ? (
          <Image
            src={image!}
            priority={true}
            width={180}
            height={200}
            className="rounded-md object-cover w-[180px] h-[200px]"
            alt="profile"
          />
        ) : (
          <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
        )}

        <UploadWidget
          handleUploadSuccess={handleUploadSuccess}
          title="Update Image"
        />
      </div>
      <div className="flex-[1.6]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPandingUpdate}
                        placeholder="user name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="e.g example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPandingUpdate}
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
                        disabled={isPandingUpdate}
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
                          disabled={isPandingUpdate}
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
                          disabled={isPandingUpdate}
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
                        disabled={isPandingUpdate}
                        placeholder="country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPandingUpdate}
              type="submit"
              className="w-full sm:w-[150px]"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
