import { AuthResponse } from "@/app/user/register/page";
import { SERVICE_URL } from "@/constants";
import { getContract } from "@/lib/thirdweb/server";
import { NextRequest, NextResponse } from "next/server";
import { getOwnedTokenIds } from "thirdweb/extensions/erc1155";

export async function POST(request: NextRequest) {
  try {
    const { toAddress } = await request.json();
    console.log("Tokengating NFT to address:", toAddress);
    const cookies = request.cookies;

    const poapJwt = cookies.get("x-poap-auth");
    const req = await fetch(`${SERVICE_URL}/auth/user`, {
      headers: {
        Authorization: poapJwt?.value || "",
      },
    });
    const json: AuthResponse = await req.json();
    const poap = json.jwt?.poap;
    if (!poapJwt || !req.ok || !poap) {
      console.log(poapJwt, json, poap);
      return NextResponse.json(
        { message: "User is not authenticated" },
        { status: 401 }
      );
    }

    // const contractAdress = "0x4D3423981762797Bc0381A6CeFd4D05B8B62bA70";
    const contract = getContract(poap.address);

    const ownedTokenIds = await getOwnedTokenIds({
      contract,
      address: toAddress,
    });

    console.log("Owned token IDs:", ownedTokenIds);

    const userOwnsToken = ownedTokenIds.some(
      (token) =>
        token.tokenId === BigInt(poap.tokenId) && token.balance > BigInt(0)
    );
    console.log("User owns token:", userOwnsToken);

    return NextResponse.json({ userOwnsToken }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
