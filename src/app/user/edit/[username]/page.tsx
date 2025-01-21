import UserRegisterPage from "@/components/pages/user-register";
import { getUser } from "@/lib/user";
import { notFound } from "next/navigation";

export interface UserLink {
  link: string;
  description: string;
  secret: boolean;
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
    notFound();
  }

  if (!user?.links) user.links = [];

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={user.nfc} user={user} />
    </div>
  );
}
