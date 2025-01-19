"use client";

import { CHAIN } from "@/constants";
import { twClient } from "@/lib/thirdweb/client";
import { ConnectButton as ThirdWebConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "google"],
    },
  }),
];

export function ConnectButton() {
  return (
    <ThirdWebConnectButton
      client={twClient}
      wallets={wallets}
      accountAbstraction={{
        chain: CHAIN,
        factoryAddress: "0xA480309BFBd5e18be842972A05972FcFE8B47352",
        gasless: true,
      }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
      connectButton={{
        label: "OPEN",
      }}
    />
  );
}
