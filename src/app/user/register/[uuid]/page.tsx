import UserRegisterPage from "@/components/pages/user-register";
import { SERVICE_URL } from "@/constants";
import { cookies, headers } from "next/headers";

interface PageProps {
  params: Promise<{ uuid: string }>;
}

export default async function Page({ params }: PageProps) {
  const uuid = (await params).uuid;

  const cookieStore = await cookies();
  const nfcAuth = cookieStore.get("x-nfc-auth");
  console.log("nfcAuth", nfcAuth);

  const headersList = await headers();
  const setCookie = headersList.get("set-cookie");
  console.log("setCookie", setCookie);

  const allHeaders = headersList.entries();
  console.log("allHeaders", allHeaders);

  const allCookies = cookieStore.getAll();
  console.log("allCookies", allCookies);

  const req = await fetch(`${SERVICE_URL}/redirects`, {
    headers: {
      Authorization: nfcAuth?.value || "",
    },
  });

  console.log("req", req.ok);

  const json = await req.json();
  console.log("json", json);

  if (!uuid) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <UserRegisterPage uuid={uuid} />
    </div>
  );
}
