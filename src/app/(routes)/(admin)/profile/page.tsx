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

import toast from "react-hot-toast";

import UploadWidget from "@/components/upload-widget";
import { updateUserProfile } from "@/actions/profile/update-user-profile";
import { getUserProfile } from "@/actions/profile/get-user-profile";
import LoadingProfile from "@/components/profile/loading-profile";

export default function ProfilePage() {
  const [isPandingUpdate, startTransitionUpdate] = useTransition();
  const [isPandingGet, startTransitionGet] = useTransition();
  const [save, setSave] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1713206862~exp=1713207462~hmac=47a0695bfb0f0f22aef2f0d694e4c8a58b888b3539a0ae06c3a4611fd5b9126e"
  );

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
    const getUserProfileData = async () => {
      startTransitionGet(async () => {
        try {
          const data: any = await getUserProfile();

          form.setValue("name", data?.data?.name);
          form.setValue("email", data?.data?.email);
          form.setValue("post_code", data?.data?.post_code);
          form.setValue("street_address", data?.data?.street_address);
          form.setValue("tel", data?.data?.tel);
          form.setValue("city", data?.data?.city);
          form.setValue("country", data?.data?.country);
          if (data?.data?.image) {
            form.setValue("image", data?.data?.image);
            setImage(data?.data?.image);
          }
        } catch (error) {
          console.log("getUserProfileData on Profile page:", error);
        }
      });
    };
    getUserProfileData();
  }, [form]);

  const onSubmit = async (data: ProfileFormTypes) => {
    startTransitionUpdate(async () => {
      try {
        await updateUserProfile(data);
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

  if (isPandingGet) {
    return <LoadingProfile />;
  }

  return (
    <>
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
      </div>
    </>
  );
}
