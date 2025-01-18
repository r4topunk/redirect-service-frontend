"use client";

import { twClient } from "@/lib/thirdweb";
import { useActiveAccount, useProfiles } from "thirdweb/react";
import { ConnectButton } from "../connect-button";
import UserForm from "../user-form";

interface UserRegisterPageProps {
  uuid: string;
}

function UserRegisterPage({ uuid }: UserRegisterPageProps) {
  const { data: profiles } = useProfiles({ client: twClient });
  const account = useActiveAccount();

  const userAdress = account?.address;
  const userEmail = profiles?.[0].details.email;
  console.log("UserRegisterPage", userAdress, userEmail);
  if (!userAdress || !userEmail) {
    return <ConnectButton />;
  }

  return (
    <UserForm
      user={{
        address: userAdress,
        email: userEmail,
        nfc: uuid,
        username: "r4to",
        bio: "Hacker",
        links: {
          items: [],
        },
      }}
    />
  );
}

export default UserRegisterPage;
