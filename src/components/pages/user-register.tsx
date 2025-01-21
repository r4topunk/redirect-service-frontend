"use client";

import { twClient } from "@/lib/thirdweb/client";
import { useActiveAccount, useProfiles } from "thirdweb/react";
import { ConnectButton } from "../connect-button";
import UserForm from "../user-form";
import { User } from "@/app/user/[username]/page";
import { useRouter } from "next/navigation";
import { r4to } from "@/constants";
import { useEffect } from "react";

interface UserRegisterPageProps {
  uuid: string;
  user: User | null;
}

function UserRegisterPage({ uuid, user }: UserRegisterPageProps) {
  const { data: profiles } = useProfiles({ client: twClient });
  const account = useActiveAccount();
  const router = useRouter();

  const userAdress = account?.address;
  const userEmail = profiles?.[0].details.email;

  useEffect(() => {
    console.log("effect user", { user, userAdress });
    if (user && account && user.address !== userAdress) {
      router.push(`/user/${user.username}`);
      return;
    }
  }, [user, userAdress, router]);

  if (!userAdress || !userEmail) {
    return (
      <div className="flex justify-center items-center w-full h-[100dvh]">
        <ConnectButton />
      </div>
    );
  }

  if (userAdress === r4to) {
    console.log({ user, uuid });
  }

  if (user && account && user.address !== userAdress) {
    return (
      <div className="flex justify-center items-center w-full h-[100dvh] font-mono">
        Redirecting...
      </div>
    );
  }

  return (
    <UserForm
      user={
        user || {
          address: userAdress,
          email: userEmail,
          nfc: uuid,
        }
      }
    />
  );
}

export default UserRegisterPage;
