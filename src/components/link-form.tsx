"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SERVICE_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useActiveAccount } from "thirdweb/react";
import { z } from "zod";
import { Checkbox } from "./ui/checkbox";

export const linkItemSchema = z.object({
  link: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(1, { message: "Description is required" }),
  secret: z.boolean().default(false),
});

export const linkFormSchema = z.object({
  userAddress: z.string(),
  linkItems: z.array(linkItemSchema).default([]),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;

export function LinkForm() {
  const account = useActiveAccount();
  const router = useRouter();

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      userAddress: "",
      linkItems: [{ link: "", description: "", secret: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "linkItems",
  });

  async function onSubmit(data: LinkFormValues) {
    const submit = await fetch(
      `${SERVICE_URL}/user/${account?.address}/redirects`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await submit.json();
    console.log(json);
    if (submit.ok) {
      router.push(`/user/${json.user.username}`);
    }
  }

  useEffect(() => {
    if (account?.address) {
      form.setValue("userAddress", account.address);
    }
  }, [account?.address, form]);

  useEffect(() => {
    if (account?.address) {
      async function fetchRedirects() {
        try {
          const response = await fetch(
            `${SERVICE_URL}/user/${account?.address}/redirects`
          );
          if (response.ok) {
            const redirects = await response.json();
            if (redirects && redirects.length > 0)
              form.setValue("linkItems", redirects);
          } else {
            console.error("Failed to fetch redirects");
          }
        } catch (error) {
          console.error("Error fetching redirects:", error);
        }
      }
      fetchRedirects();
    }
  }, [account?.address, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="space-y-4">
          {fields.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              There are no links
            </p>
          )}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 p-4 border rounded-md"
            >
              <FormField
                control={form.control}
                name={`linkItems.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`linkItems.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`linkItems.${index}.secret`}
                render={({ field }) => (
                  <FormItem>
                    <div className="items-top flex space-x-2 my-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>Secret</FormLabel>
                        <FormDescription>
                          Mark this link as secret if you want to hide it from
                          public view
                        </FormDescription>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="self-end"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() => append({ link: "", description: "", secret: false })}
          >
            <Plus />
            Add Link
          </Button>
        </div>
      </form>
    </Form>
  );
}
