import { fetchRoutes } from "@/lib/redirect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { route } = req.query;
  console.log({ route });

  const { data, error } = await fetchRoutes();

  if (error) {
    console.error("Failed to fetch routes:", error);
    return res.status(500).json({ message: "Failed to fetch routes" });
  } else {
    console.log("Fetched routes:", data);
    return res.status(200).json({ data });
  }
}
