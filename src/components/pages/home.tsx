"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ConnectButton } from "@/components/connect-button";
import NavBreadcrumb from "@/components/nav-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";

function HomePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeAccount = useActiveAccount();
  const status = useActiveWalletConnectionStatus();

  if (status === "connecting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Connecting...</span>
      </div>
    );
  }

  if (!activeAccount) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ConnectButton />
      </div>
    );
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-full">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}

export default HomePage;