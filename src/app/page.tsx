"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ConnectButton } from "@/components/connect-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
import { RouteType } from "@/lib/redirect";
import { CheckIcon, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";

export default function Page() {
  const activeAccount = useActiveAccount();
  const status = useActiveWalletConnectionStatus();
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
      console.log("Fetched routes:", routes);
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

  if (status === "connecting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Connecting...</span>
      </div>
    );
  }

  if (!activeAccount) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ConnectButton />
      </div>
    );
  }
  console.log(activeAccount);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-full">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center">
              <Button onClick={getRoutes}>Hello world</Button>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50  flex justify-center items-center">
              <ConnectButton />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <textarea className="p-2 bg-muted/50 rounded-xl w-full h-full" />
            </div>
          </div>
          <div className="min-h-[100vh] p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full overflow-scroll">
            <Table className="max-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>UUID</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Redirect</TableHead>
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
                    <TableCell className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={route.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button variant="outline" size={"icon"}>
                                <ExternalLink />
                              </Button>
                            </a>
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
