import UserPage from "@/components/pages/user";
import { getUser } from "@/lib/user";

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

  return <UserPage user={user} />;
}
