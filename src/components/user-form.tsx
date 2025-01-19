"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PrefixedInput } from "./ui/prefixed-input";

export const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 2 characters" })
    .max(12, { message: "Username must be at most 12 characters" }),
  address: z.string(),
  nfc: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  avatar: z.instanceof(File, { message: "Invalid avatar" }).or(z.string()),
  bio: z.string().nonempty({ message: "Role is required" }),
  x: z.string().or(z.undefined()),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  shop: z.string().optional(),
  contact_email: z.string().optional(),
  links: z
    .array(
      z.object({
        url: z.string().url({ message: "Invalid link" }),
        description: z
          .string()
          .nonempty({ message: "Description is required" }),
      })
    )
    .optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

interface UserFormProps {
  user?: Partial<UserFormData>;
}

function UserForm({ user: defaultUser }: UserFormProps) {
  const router = useRouter();
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultUser?.username ?? "",
      address: defaultUser?.address ?? "",
      avatar: defaultUser?.avatar ?? "",
      nfc: defaultUser?.nfc ?? "",
      email: defaultUser?.email ?? "",
      bio: defaultUser?.bio ?? "",
      x: defaultUser?.x ?? "",
      instagram: defaultUser?.instagram ?? "",
      tiktok: defaultUser?.tiktok ?? "",
      shop: defaultUser?.shop ?? "",
      contact_email: defaultUser?.email ?? "",
      links: defaultUser?.links ?? [],
    },
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof defaultUser?.avatar === "string" && defaultUser.avatar) {
      setAvatarPreview(defaultUser.avatar);
    }
  }, [defaultUser?.avatar]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("avatar", file);
      const reader = new FileReader();
      reader.onload = (event) =>
        setAvatarPreview(event.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  }

  async function onSubmit(values: UserFormData) {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("address", values.address);
    formData.append("nfc", values.nfc);
    formData.append("email", values.email);
    formData.append("bio", values.bio);
    console.log("x", values.x);
    if (values.x) formData.append("x", values.x);
    if (typeof values.instagram === "string") {
      formData.append("instagram", values.instagram);
    }
    if (typeof values.tiktok === "string") {
      formData.append("tiktok", values.tiktok);
    }
    if (typeof values.shop === "string") {
      formData.append("shop", values.shop);
    }
    if (typeof values.contact_email === "string") {
      formData.append("contact_email", values.contact_email);
    }
    if (values.avatar) formData.append("avatar", values.avatar);
    formData.append("links", JSON.stringify(values.links));

    await fetch("/api/user", {
      method: "PUT",
      body: formData,
    });

    router.push(`/user/${values.username}`);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-3 border border-input rounded-lg p-4">
          <FormLabel className="text-lg font-semibold mb-[-4px]">
            Profile
          </FormLabel>
          <FormField
            control={form.control}
            name="nfc"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Avatar</FormLabel>
                <FormControl className={"hidden"}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-16 h-16" onClick={handleAvatarClick}>
                    <AvatarImage
                      src={avatarPreview || ""}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User
                        strokeWidth={1.4}
                        size={24}
                        className="text-muted-foreground"
                      />
                    </AvatarFallback>
                  </Avatar>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Role</FormLabel>
                <FormControl>
                  <Input placeholder="Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Ethereum Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address"
                    type="text"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3 border border-input rounded-lg p-4">
          <FormLabel className="text-lg font-semibold mb-[-4px]">
            Social
          </FormLabel>
          <FormDescription>
            Add the username for your social media profiles.
          </FormDescription>
          <FormField
            control={form.control}
            name="x"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">X</FormLabel>
                <FormControl>
                  <PrefixedInput
                    prefix="@"
                    placeholder="username"
                    type="text"
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Instagram</FormLabel>
                <FormControl>
                  <PrefixedInput
                    prefix="@"
                    placeholder="username"
                    type="text"
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tiktok"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">TikTok</FormLabel>
                <FormControl>
                  <PrefixedInput
                    prefix="@"
                    placeholder="username"
                    type="text"
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Shop</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://shop.com/"
                    type="url"
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
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
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@mail.com"
                    type="email"
                    {...field}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Confirm"}
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
