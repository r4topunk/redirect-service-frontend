"use client";

import RedirectEditDialog from "@/components/redirects/edit-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NextLink } from "@/lib/next";
import { RedirectType } from "@/lib/redirect";
import { CheckIcon, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface RedirectRowProps {
  route: RedirectType;
}

function RedirectRow({ route }: RedirectRowProps) {
  const [currentRoute, setRoute] = useState<RedirectType>(route);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <TableRow key={currentRoute.uuid}>
      <TableCell>{currentRoute.uuid}</TableCell>
      <TableCell>{currentRoute?.project.name || "-"}</TableCell>
      <TableCell>
        {new Date(currentRoute.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>{currentRoute.url}</TableCell>
      <TableCell>{currentRoute.description}</TableCell>
      <TableCell className="flex gap-1">
        <RedirectEditDialog route={currentRoute} setRoute={setRoute} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NextLink
                href={currentRoute.link}
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
                onClick={() => handleCopy(currentRoute.link)}
              >
                {copied === currentRoute.link ? (
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
  );
}

export default RedirectRow;
