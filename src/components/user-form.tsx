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

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 2 characters." })
    .max(12, { message: "Username must be at most 12 characters." }),
  address: z.string(),
  nfc: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  avatar: z.string().url({ message: "Invalid URL." }),
  bio: z.string().nonempty({ message: "Bio is required." }),
  links: z.object({
    items: z.array(
      z.object({
        url: z.string().url({ message: "Invalid link." }),
        description: z
          .string()
          .nonempty({ message: "Description is required." }),
      })
    ),
    x: z.string().url({ message: "Invalid X link." }).optional(),
    instagram: z
      .string()
      .url({ message: "Invalid Instagram link." })
      .optional(),
    tiktok: z.string().url({ message: "Invalid TikTok link." }).optional(),
    shop: z.string().url({ message: "Invalid Shop link." }).optional(),
    email: z.string().email({ message: "Invalid contact email." }).optional(),
  }),
});

interface UserFormProps {
  user?: z.infer<typeof formSchema>;
}

function UserForm({ user: defaultUser }: UserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultUser,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                  <Input placeholder="Avatar URL" type="url" {...field} />
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
                  <Input placeholder="https://x.com/" type="url" {...field} />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
