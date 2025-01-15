"use client";

import RedirectEditDialog from "@/components/redirects/edit-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NextLink } from "@/lib/next";
import { RouteType } from "@/lib/redirect";
import { CheckIcon, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

function RedirectsPage() {
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  async function getRoutes() {
    try {
      const response = await fetch("/api/redirect/routes");
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const routes = await response.json();
      setRoutes(routes.data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  }

  useEffect(() => {
    getRoutes();
  }, []);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 1000);
  };
  return (
    <div className="p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full">
      <Table className="max-w-full rounded-sm overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Redirect</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.uuid}>
              <TableCell>{route.uuid}</TableCell>
              <TableCell>
                {new Date(route.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{route.url}</TableCell>
              <TableCell>{route.description}</TableCell>
              <TableCell className="flex gap-1">
                <RedirectEditDialog route={route} setRoutes={setRoutes} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NextLink
                        href={route.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="outline" size={"icon"}>
                          <ExternalLink />
                        </Button>
                      </NextLink>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Access redirect</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size={"icon"}
                        onClick={() => handleCopy(route.link)}
                      >
                        {copied === route.link ? (
                          <CheckIcon className="animate-in animate-out duration-150" />
                        ) : (
                          <Copy className="animate-in animate-out duration-150" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RedirectsPage;
