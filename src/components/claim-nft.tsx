"use client";

import { User } from "@/app/user/[username]/page";
import { Handshake } from "lucide-react";
import React, { useEffect, useState } from "react";
import PietLogo from "./icons/piet";
import { Button } from "./ui/button";
import { useActiveAccount } from "thirdweb/react";

interface ClaimNftProps {
  user: User;
  claimed: boolean;
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  showClaim: boolean;
  setShowClaim: React.Dispatch<React.SetStateAction<boolean>>;
}

function ClaimNft({
  user,
  claimed,
  setClaimed,
  showClaim,
  setShowClaim,
}: ClaimNftProps) {
  const tokenId = 0;
  const [loading, setLoading] = useState(false);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await fetch("/api/thirdweb/tokengate", {
          method: "POST",
          body: JSON.stringify({ toAddress: activeAccount?.address, tokenId }),
        });
        if (response.ok) {
          const { userOwnsToken } = await response.json();
          if (userOwnsToken) {
            setClaimed(true);
          }
          setShowClaim(true);
        }
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleClaim() {
    if (!claimed) {
      setLoading(true);
      try {
        const response = await fetch("/api/thirdweb", {
          method: "POST",
          body: JSON.stringify({ toAddress: activeAccount?.address, tokenId }),
        });
        if (!response.ok) {
          console.error("Failed to claim NFT", response);
        } else {
          setClaimed((claimed) => !claimed);
        }
      } catch (error) {
        console.error("An error occurred while claiming NFT", error);
      } finally {
        setLoading(false);
      }
    }
  }

  if (!showClaim) return null;

  return !claimed ? (
    <Button
      disabled={loading}
      onClick={handleClaim}
      className=" w-full bg-orange-100 dark:bg-orange-500 dark:text-white text-orange-500 border border-orange-500 px-4 py-2 rounded-md mx-auto font-semibold flex items-center justify-center gap-1 leading-none hover:bg-orange-100 hover:scale-[1.015] transition-transform"
    >
      {/* <Sparkles className="inline-block w-4 h-4" /> */}
      <PietLogo className="inline-block w-4 h-4" />
      Claim NFT
    </Button>
  ) : (
    <Button
      disabled={loading}
      onClick={handleClaim}
      className="w-full bg-orange-100 text-orange-500 dark:bg-orange-500 dark:text-white hover:bg-orange-100 border-none px-4 py-2 rounded-md mx-auto font-medium flex items-center justify-center gap-1 leading-none hover:scale-[1.015] transition-transform"
    >
      <Handshake strokeWidth={1.5} />
      You met @{user.username}
    </Button>
  );
}

export default ClaimNft;
