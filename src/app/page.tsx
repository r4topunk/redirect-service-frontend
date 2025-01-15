"use client";

import { ConnectButton } from "@/components/connect-button";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";

export default function Page() {
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
      <div className="flex items-center justify-center h-screen">
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
