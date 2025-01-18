import UserPage from "@/components/pages/user";
import { Address } from "thirdweb";

interface UserLink {
  url: string;
  description: string;
}

interface Links {
  items: UserLink[];
  x: string | null;
  instagram: string | null;
  tiktok: string | null;
  shop: string | null;
  email: string | null;
}

export interface User {
  username: string;
  address: Address | null;
  email: string;
  avatar: string;
  bio: string;
  links: Links;
}

function getUser(username: string): User | null {
  return users.find((user) => user.username === username) || null;
}

const users: User[] = [
  {
    username: "pedro_and",
    address: "0xP",
    email: "pedro_and@example.com",
    avatar:
      "https://framerusercontent.com/images/AHDBORneJuYz3uM44DprfVeIiNk.jpeg",
    bio: "Creative Director",
    links: {
      items: [
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
      x: "https://x.com/P_____Andrade",
      instagram: "https://www.instagram.com/pedro_and/",
      tiktok: "https://www.tiktok.com/@piet_org",
      shop: "https://www.p-andrade.com/",
      email: "mailto:pedro_and@example.com",
    },
  },
  {
    username: "marina_cobucci",
    address: "0xM",
    email: "marina_cobucci@example.com",
    avatar:
      "https://framerusercontent.com/images/P0jbH4qsotC4zqfnLNeBlG0EX6U.jpeg",
    bio: "Product Manager",
    links: {
      items: [
        {
          url: "https://piet.com.br",
          description: "Link 1",
        },
        {
          url: "https://piet.com.br",
          description: "Link 2",
        },
      ],
      x: "https://twitter.com/marina_cobucci",
      instagram: "https://instagram.com/marina_cobucci",
      tiktok: null,
      shop: null,
      email: "mailto:marina_cobucci@example.com",
    },
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
