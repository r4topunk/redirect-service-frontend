"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConnectButton } from "./connect-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 2 characters." })
    .max(12, { message: "Username must be at most 12 characters." }),
  address: z.string(),
  nfc: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  avatar: z.instanceof(File),
  bio: z.string().nonempty({ message: "Bio is required." }),
  links: z.object({
    items: z
      .array(
        z.object({
          url: z.string().url({ message: "Invalid link." }),
          description: z
            .string()
            .nonempty({ message: "Description is required." }),
        })
      )
      .optional(),
    x: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    instagram: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    tiktok: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    shop: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    email: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  }),
});

export type UserFormData = z.infer<typeof formSchema>;

interface UserFormProps {
  user?: Partial<UserFormData>;
}

function UserForm({ user: defaultUser }: UserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultUser?.username ?? "",
      address: defaultUser?.address ?? "",
      nfc: defaultUser?.nfc ?? "",
      email: defaultUser?.email ?? "",
      bio: defaultUser?.bio ?? "",
      links: {
        items: defaultUser?.links?.items ?? [],
        x: defaultUser?.links?.x ?? "",
        instagram: defaultUser?.links?.instagram ?? "",
        tiktok: defaultUser?.links?.tiktok ?? "",
        shop: defaultUser?.links?.shop ?? "",
        email: defaultUser?.links?.email ?? "",
      },
    },
  });

  console.log(form.formState);

  async function onSubmit(values: UserFormData) {
    console.log(values);

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("address", values.address);
    formData.append("nfc", values.nfc);
    formData.append("email", values.email);
    formData.append("bio", values.bio);
    if (values.avatar) formData.append("avatar", values.avatar);
    formData.append("links", JSON.stringify(values.links));

    await fetch("/api/user", {
      method: "PUT",
      body: formData,
    });
  }

  return (
    <Form {...form}>
      <ConnectButton />
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
            name="avatar"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Avatar URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avatar URL"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
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
            Links
          </FormLabel>
          <FormField
            control={form.control}
            name="links.x"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">X</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://x.com/"
                    type="url"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.instagram"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/"
                    type="url"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.tiktok"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">TikTok</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://tiktok.com/"
                    type="url"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.shop"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Shop</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://shop.com/"
                    type="url"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@mail.com"
                    type="email"
                    {...field}
                    value={field.value ?? ""}
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
