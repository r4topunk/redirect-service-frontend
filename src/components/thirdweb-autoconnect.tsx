"use client";

import { CHAIN, twClient } from "@/lib/thirdweb";
import { AutoConnect as TwAutoConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "google"],
    },
  }),
];

export default function AutoConnect() {
  return (
    <TwAutoConnect
      wallets={wallets}
      client={twClient}
      accountAbstraction={{
        chain: CHAIN,
        factoryAddress: "0xA480309BFBd5e18be842972A05972FcFE8B47352",
        gasless: true,
      }}
    />
  );
}
