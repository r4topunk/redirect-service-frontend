import { erc1155MintTo, getContract } from "@/lib/thirdweb/server";
import { NextRequest, NextResponse } from "next/server";
import { getOwnedTokenIds } from "thirdweb/extensions/erc1155";

export async function POST(request: NextRequest) {
  try {
    const { toAddress, tokenId } = await request.json();
    console.log("Minting NFT to address:", toAddress);

    const contractAdress = "0x4D3423981762797Bc0381A6CeFd4D05B8B62bA70";
    const contract = getContract(contractAdress);

    const ownedTokenIds = await getOwnedTokenIds({
      contract,
      address: toAddress,
    });

    console.log("Owned token IDs:", ownedTokenIds);
    if (
      ownedTokenIds.some(
        (token) =>
          token.tokenId === BigInt(tokenId) && token.balance > BigInt(0)
      )
    ) {
      return NextResponse.json(
        { message: "User already owns the token" },
        { status: 400 }
      );
    }

    const txResult = await erc1155MintTo(contractAdress, toAddress, tokenId);
    console.log("Transaction result:", txResult);
    // console.log("Owned NFTs:", serializedNFTs);

    const error = null;
    if (error) {
      console.error("Failed to create route:", error);
      return NextResponse.json(
        { message: "Failed to create route" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: null }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    const message =
      err instanceof Error ? err.message.replace("\n", " ") : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
