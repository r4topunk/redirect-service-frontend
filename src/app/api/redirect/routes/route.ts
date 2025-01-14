import { fetchRoutes } from "@/lib/redirect";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await fetchRoutes();
  if (error) {
    console.error("Failed to fetch routes:", error);
    return NextResponse.json(
      { message: "Failed to fetch routes" },
      { status: 500 }
    );
  } else {
    console.log("Fetched routes:", data);
    return NextResponse.json({ data }, { status: 200 });
  }
}
