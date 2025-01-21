"use client";

import { ACCOUNT_FACTORY, CHAIN } from "@/constants";
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
        factoryAddress: ACCOUNT_FACTORY,
        gasless: true,
      }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
      connectButton={{
        label: "OPEN",
      }}
      detailsModal={{
        hideSwitchWallet: true,
        hideBuyFunds: true,
        hideSendFunds: true,
        hideReceiveFunds: true,
      }}
    />
  );
}
