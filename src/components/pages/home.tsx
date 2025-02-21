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

const ADMIN_ADDRESSES = [
  "0xc830d35d423dE0baF6f36a40B3EA8414e20b07d6", // r4to
  "0x915Ecfcd3e4b9a26C6ba8573CF46EB6081D339B8", // piixel
];

function HomePage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeAccount = useActiveAccount();
  const status = useActiveWalletConnectionStatus();

  if (status === "connecting") {
    return (
      <div className="flex items-center justify-center h-screen w-full">
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

  console.log("activeAccount", activeAccount.address);

  if (
    !activeAccount.address ||
    !ADMIN_ADDRESSES.includes(activeAccount.address)
  ) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <span>Unauthorized</span>
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
