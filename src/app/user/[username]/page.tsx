import UserPage from "@/components/pages/user";
import { SERVICE_URL } from "@/constants";
import { getUser } from "@/lib/user";
import { cookies } from "next/headers";

export interface UserLink {
  url: string;
  description: string;
}

export interface User {
  username: string;
  address: string;
  email: string;
  avatar: string;
  bio: string;
  nfc: string;
  links: UserLink[];
  x?: string;
  instagram?: string;
  tiktok?: string;
  shop?: string;
  contact_email?: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await getUser((await params).username);

  if (!user) {
    return <div>User not found</div>;
  }

  if (!user?.links) user.links = [];

  const cookieStore = await cookies();
  const poapAuth = cookieStore.get("x-poap-auth");

  const req = await fetch(`${SERVICE_URL}/auth/user`, {
    headers: {
      Authorization: poapAuth?.value || "",
    },
  });

  const showClaimButton = req.ok;

  return <UserPage user={user} showClaimButton={showClaimButton} />;
}
