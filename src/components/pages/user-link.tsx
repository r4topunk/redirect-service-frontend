"use client";

import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { ConnectButton } from "../connect-button";
import { LinkForm } from "../link-form";

function UserLinksPage() {
  const status = useActiveWalletConnectionStatus();

  if (status !== "connected") {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">User links</h2>
      <LinkForm />
    </div>
  );
}

export default UserLinksPage;
