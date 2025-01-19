import UserPage from "@/components/pages/user";

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

function getUser(username: string): User | null {
  return users.find((user) => user.username === username) || null;
}

const users: User[] = [
  {
    username: "pedro_and",
    address: "0xP",
    email: "pedro_and@example.com",
    nfc: "0000-",
    avatar:
      "https://framerusercontent.com/images/AHDBORneJuYz3uM44DprfVeIiNk.jpeg",
    bio: "Creative Director",
    x: "https://x.com/P_____Andrade",
    instagram: "https://www.instagram.com/pedro_and/",
    tiktok: "https://www.tiktok.com/@piet_org",
    shop: "https://www.p-andrade.com/",
    contact_email: "mailto:pedro_and@example.com",
    links: [
      {
        url: "https://piet.com.br",
        description: "Link 1",
      },
      {
        url: "https://piet.com.br",
        description: "Link 2",
      },
      {
        url: "https://piet.com.br",
        description: "Link 3",
      },
    ],
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = getUser((await params).username);

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserPage user={user} />;
}
