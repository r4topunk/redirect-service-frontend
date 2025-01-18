import UserPage from "@/components/pages/user";
import { Address } from "thirdweb";

interface Link {
  url: string;
  description: string;
}

export interface User {
  username: string;
  address: Address;
  email: string;
  avatar: string;
  bio: string;
  links: Link[];
}

function getUser(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

const users: User[] = [
  {
    username: "pedro_and",
    address: "0xP",
    email: "pedro_and@example.com",
    avatar:
      "https://framerusercontent.com/images/AHDBORneJuYz3uM44DprfVeIiNk.jpeg",
    bio: "Creative Director",
    links: [
      {
        url: "https://x.com/P_____Andrade",
        description: "X",
      },
      {
        url: "https://www.instagram.com/pedro_and/",
        description: "Instagram",
      },
      {
        url: "https://www.tiktok.com/@piet_org",
        description: "TikTok",
      },
      {
        url: "https://www.p-andrade.com/",
        description: "Shop",
      },
      {
        url: "mailto:pedro_and@example.com",
        description: "Email",
      },
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
  {
    username: "marina_cobucci",
    address: "0xM",
    email: "marina_cobucci@example.com",
    avatar:
      "https://framerusercontent.com/images/P0jbH4qsotC4zqfnLNeBlG0EX6U.jpeg",
    bio: "Product Manager",
    links: [
      {
        url: "https://twitter.com/marina_cobucci",
        description: "Twitter",
      },
      {
        url: "https://instagram.com/marina_cobucci",
        description: "Instagram",
      },
      {
        url: "https://tiktok.com/@marina_cobucci",
        description: "TikTok",
      },
      {
        url: "https://shop.com/marina_cobucci",
        description: "Shop",
      },
      {
        url: "mailto:marina_cobucci@example.com",
        description: "Email",
      },
    ],
  },
];

export default function Page({ params }: { params: { username: string } }) {
  const user = getUser(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserPage user={user} />;
}
