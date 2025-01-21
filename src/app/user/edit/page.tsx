"use client";

import { ConnectButton } from "@/components/connect-button";
import UserRegisterPage from "@/components/pages/user-register";
import { getUser } from "@/lib/user";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { User } from "../[username]/page";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const account = useActiveAccount();

  useEffect(() => {
    (async () => {
      if (account?.address) {
        const user = await getUser(account.address);
        setUser(user || null);
        setUserLoaded(true);
      }
    })();
  }, [account?.address]);

  if (!account) {
    return (
      <div className="flex justify-center items-center w-full h-[100dvh] font-mono">
        <ConnectButton />
      </div>
    );
  }

  // const user = await getUserByNfc(uuid);

  if ((userLoaded && !user) || !user?.nfc) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={user.nfc} user={user} />
    </div>
  );
}
