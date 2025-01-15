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

interface RedirectEditDialogProps {
  route: RouteType;
  setRoutes: Dispatch<SetStateAction<RouteType[]>>;
}

function RedirectEditDialog({ route, setRoutes }: RedirectEditDialogProps) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = prevRoutes.map((r) => {
        if (r.uuid === route.uuid) {
          console.log("Found route to update", r);
          return {
            ...r,
            url: (document.getElementById("url") as HTMLInputElement).value,
            description: (
              document.getElementById("description") as HTMLTextAreaElement
            ).value,
          };
        }
        return r;
      });
      return updatedRoutes;
    });
    setOpen(false);
  };

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
        <div className="grid gap-4 py-4">
          <Input
            id="uuid"
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
              name="url"
              defaultValue={route.url}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right mt-2">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              name="description"
              defaultValue={route.description || ""}
              placeholder="Type your description here"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>{"Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RedirectEditDialog;
