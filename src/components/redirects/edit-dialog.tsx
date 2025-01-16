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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RouteType } from "@/lib/redirect";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";

interface RedirectEditDialogProps {
  route: RouteType;
  setRoutes: Dispatch<SetStateAction<RouteType[]>>;
}

interface FormData {
  url: string;
  description: string | null;
  uuid: string;
}

function RedirectEditDialog({ route, setRoutes }: RedirectEditDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      url: route.url,
      description: route.description || null,
      uuid: route.uuid,
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/redirect/routes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to update route");
        return;
      }

      const updatedData = await response.json();
      setRoutes((prevRoutes) => {
        const updatedRoutes = prevRoutes.map((r) => {
          if (r.uuid === route.uuid) {
            return { ...r, url: data.url, description: data.description };
          }
          return r;
        });
        return updatedRoutes;
      });
      setOpen(false);
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const urlPattern =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size={"icon"}>
                <Edit />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit redirect</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit redirect</DialogTitle>
          <DialogDescription>
            {`Make changes to the redirect here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              id="uuid"
              {...register("uuid")}
              name="uuid"
              defaultValue={route.uuid}
              className="hidden"
            />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Redirect to
              </Label>
              <Input
                id="url"
                {...register("url", {
                  required: "URL is required",
                  pattern: { value: urlPattern, message: "Invalid URL" },
                })}
                className="col-span-3"
              />
              {errors.url && (
                <p className="text-red-500 col-span-4 text-sm text-end mt-[-8px]">
                  {errors.url.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea
                className="col-span-3"
                id="description"
                {...register("description")}
                placeholder="Type your description here"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RedirectEditDialog;
