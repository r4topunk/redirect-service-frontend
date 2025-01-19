import { optimismSepolia } from "thirdweb/chains";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const SERVICE_API_KEY = process.env.SERVICE_API_KEY!;
export const SERVICE_URL = process.env.SERVICE_URL!;

export const CHAIN = optimismSepolia;
