import { User } from "@/app/user/[username]/page";
import { UserFormData } from "@/components/user-form";
import { SERVICE_API_KEY, SERVICE_URL } from "@/constants";

export async function createUser(user: UserFormData) {
  try {
    const res = await fetch(`${SERVICE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: SERVICE_API_KEY,
      },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message);
    return { data: json.data, error: null };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { data: null, error };
  }
}

export async function getUser(username: string) {
  if (username === "test_pedro_and") {
    return users[0];
  }

  try {
    const res = await fetch(`${SERVICE_URL}/user/${username}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await res.json();
    const user = json?.user;
    return (user as User) || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export async function getUserByNfc(uuid: string) {
  try {
    const res = await fetch(`${SERVICE_URL}/user/nfc/${uuid}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await res.json();
    const user = json?.user;
    return (user as User) || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

const users: User[] = [
  {
    username: "test_pedro_and",
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
