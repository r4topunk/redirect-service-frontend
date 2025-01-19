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
