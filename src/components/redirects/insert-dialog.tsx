"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RedirectType } from "@/lib/redirect";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface InsertDialogFormData {
  url: string;
  description: string;
  quantity: number;
}

interface InsertDialogProps {
  setRedirects: Dispatch<SetStateAction<RedirectType[]>>;
}

export default function InsertRedirectDialog({
  setRedirects,
}: InsertDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InsertDialogFormData>();

  const onSubmit = async (data: InsertDialogFormData) => {
    const redirects = Array.from({ length: data.quantity }, () => ({
      url: data.url,
      description: data.description,
    }));
    try {
      const response = await fetch("/api/redirect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: redirects }),
      });
      if (response.ok) {
        setOpen(false);
      }
      const json = await response.json();
      console.log("res", json.data);
      setRedirects((redirects) => [...redirects, ...json.data]);
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>Insert Redirect</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new redirect</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new redirect. The quantity field
            will replicate the register for the number of times specified.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                type="number"
                id="quantity"
                {...register("quantity", { valueAsNumber: true })}
                className="col-span-3"
                defaultValue={1}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                placeholder={"https://ss-tm.org"}
                {...register("url", { required: true })}
                className="col-span-3"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder={"Description of the redirect"}
                {...register("description")}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Inserting..." : "Insert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
