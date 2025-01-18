import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const address = formData.get("address");
    const nfc = formData.get("nfc");
    const email = formData.get("email");
    const bio = formData.get("bio");
    const links = formData.get("links");
    const avatar = formData.get("avatar");

    console.log("Received Params:");
    console.log({ username, address, nfc, email, bio, links });
    console.log("Received File:", avatar);

    const data = null;
    const error = false;
    if (error) {
      console.error("Failed to update route:", error);
      return NextResponse.json(
        { message: "Failed to update route" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
