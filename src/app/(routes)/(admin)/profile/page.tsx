"use client";

import Loading from "@/components/Loading";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

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
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ProfileFormTypes } from "@/types/schema";

import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  useGetAuthUserQuery,
  useUpdateAuthUserMutation,
} from "@/rtk/features/users/usersApiSlice";
import LoadingProfile from "@/components/profile/loading-profile";
import UploadWidget from "@/components/upload-widget";

export default function ProfilePage() {
  const [isPanding, startTransition] = useTransition();
  const [save, setSave] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1713206862~exp=1713207462~hmac=47a0695bfb0f0f22aef2f0d694e4c8a58b888b3539a0ae06c3a4611fd5b9126e"
  );

  const [updateUser, { isLoading }] = useUpdateAuthUserMutation();
  const {
    data: user,
    isSuccess,
    isLoading: isGetAuthUserLoading,
  } = useGetAuthUserQuery({});
  const form = useForm<ProfileFormTypes>({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      tel: "",
      street_address: "",
      post_code: "",
      city: "",
      country: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.setValue("name", user?.user.name);
      form.setValue("email", user?.user.email);
      form.setValue("post_code", user?.user.post_code);
      form.setValue("street_address", user?.user.street_address);
      form.setValue("tel", user?.user.tel);
      form.setValue("city", user?.user.city);
      form.setValue("country", user?.user.country);
      if (user?.user.image) {
        form.setValue("image", user?.user.image);
        setImage(user?.user.image);
      }
    }
  }, [isSuccess]);

  const onSubmit = async (data: ProfileFormTypes) => {
    startTransition(async () => {
      try {
        await updateUser(data);
      } catch (error) {
        console.log("onSubmit on Profile page:", error);
      } finally {
        toast.success("Profile updated successfully");
        setSave(true);
        setTimeout(() => {
          setSave(false);
        }, 5000);
      }
    });
  };

  const handleUploadSuccess = (result: any) => {
    form.setValue("image", result.info.secure_url);
    setImage(result.info.secure_url);
  };

  if (isGetAuthUserLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      {(isPanding || isLoading) && <Loading />}
      <div className="py-20 wrapper">
        {!isAdmin && (
          <h2 className="flex items-center justify-center text-5xl font-medium text-primary mb-6">
            Profile
          </h2>
        )}
        {save && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p className="font-bold">Saved!</p>
          </div>
        )}
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="flex-[0.4] flex flex-col items-center">
            {form.getValues("image") ? (
              <Image
                src={form.getValues("image") as string}
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPanding}
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
                            disabled={isPanding}
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
                            disabled={isPanding}
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
                              disabled={isPanding}
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
                              disabled={isPanding}
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
                            disabled={isPanding}
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
                  disabled={isPanding}
                  type="submit"
                  className="w-full sm:w-[150px]"
                >
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
