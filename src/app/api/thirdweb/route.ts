import { erc1155MintTo } from "@/lib/thirdweb";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const r4to = "0x1fd1405aE28ef1855A0d26CE07555Be661405fCb";
    const contractAdress = "0x4D3423981762797Bc0381A6CeFd4D05B8B62bA70";

    const txResult = await erc1155MintTo(contractAdress, r4to, 0);

    console.log("Transaction result:", txResult);
    const txHash = txResult.transactionHash;
    const error = null;
    if (error) {
      console.error("Failed to create route:", error);
      return NextResponse.json(
        { message: "Failed to create route" },
        { status: 500 }
      );
    }
    return NextResponse.json({ txHash }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
