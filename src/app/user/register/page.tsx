import UserRegisterPage from "@/components/pages/user-register";
import { SERVICE_URL } from "@/constants";
import { cookies } from "next/headers";
import { User } from "../[username]/page";

type AuthResponse = {
  message: string;
  jwt?: {
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
  user?: User;
};

export default async function Page() {
  const cookieStore = await cookies();
  const nfcAuth = cookieStore.get("x-nfc-auth");

  const req = await fetch(`${SERVICE_URL}/auth/user`, {
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

  if (!json.jwt) {
    return (
      <div className="flex justify-center items-center w-full h-[100dvh] font-mono">
        401 - Unauthorized
      </div>
    );
  }

  // if (user) {
  //   return (
  //     <div className="flex justify-center items-center w-full h-[100dvh] font-mono">
  //       403 - Forbidden
  //     </div>
  //   );
  // }

  const user = json.user || null;
  const uuid = json.jwt.uuid;

  // const user = await getUserByNfc(uuid);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={uuid} user={user} />
    </div>
  );
}
