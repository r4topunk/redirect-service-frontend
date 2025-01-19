import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = null;
    const error = null;

    if (error) {
      console.error("Failed to create route:", error);
      return NextResponse.json(
        { message: "Failed to create route" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("Error parsing request body:", err);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
