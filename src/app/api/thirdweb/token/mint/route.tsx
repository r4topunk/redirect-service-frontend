import { mintNewPoap } from "@/lib/thirdweb/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const contractAddress = "0x4D3423981762797Bc0381A6CeFd4D05B8B62bA70";
    const result = await mintNewPoap(contractAddress);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    const message =
      err instanceof Error ? err.message.replace("\n", " ") : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
