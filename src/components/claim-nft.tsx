"use client";

import { User } from "@/app/user/[username]/page";
import { Handshake } from "lucide-react";
import React from "react";
import PietLogo from "./icons/piet";
import { Button } from "./ui/button";

interface ClaimNftProps {
  user: User;
  claimed: boolean;
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
}

function ClaimNft({ user, claimed, setClaimed }: ClaimNftProps) {
  async function handleClaim() {
    const response = await fetch("/api/thirdweb", {
      method: "POST",
      body: JSON.stringify({ address: user.address }),
    });
    const data = await response.json();
    console.log({ data });
    setClaimed((claimed) => !claimed);
  }

  return !claimed ? (
    <Button
      onClick={handleClaim}
      className=" w-full bg-orange-100 dark:bg-orange-500 dark:text-white text-orange-500 border border-orange-500 px-4 py-2 rounded-md mx-auto font-semibold flex items-center justify-center gap-1 leading-none hover:bg-orange-100 hover:scale-[1.015] transition-transform"
    >
      {/* <Sparkles className="inline-block w-4 h-4" /> */}
      <PietLogo className="inline-block w-4 h-4" />
      Claim NFT
    </Button>
  ) : (
    <Button
      onClick={handleClaim}
      className="w-full bg-orange-100 text-orange-500 dark:bg-orange-500 dark:text-white hover:bg-orange-100 border-none px-4 py-2 rounded-md mx-auto font-medium flex items-center justify-center gap-1 leading-none hover:scale-[1.015] transition-transform"
    >
      <Handshake strokeWidth={1.5} />
      You met @{user.username}
    </Button>
  );
}

export default ClaimNft;
