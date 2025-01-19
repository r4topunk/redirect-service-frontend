import UserRegisterPage from "@/components/pages/user-register";
import { SERVICE_URL } from "@/constants";
import { cookies } from "next/headers";

type AuthResponse = {
  message: string;
  jwt: {
    uuid: string;
    chainId?: number;
    phygital?: {
      address: string;
      tokenId: number;
    };
    poap?: {
      address: string;
      tokenId: number;
    };
  };
};

export default async function Page() {
  const cookieStore = await cookies();
  const nfcAuth = cookieStore.get("x-nfc-auth");

  const req = await fetch(`${SERVICE_URL}/auth`, {
    headers: {
      Authorization: nfcAuth?.value || "",
    },
  });

  if (!req.ok) {
    return (
      <div className="flex justify-center items-center w-full h-[100dvh] font-mono">
        401 - Unauthorized
      </div>
    );
  }

  const json: AuthResponse = await req.json();
  const uuid = json.jwt.uuid;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={uuid} />
    </div>
  );
}
