import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "@/constants";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
export function getStorageUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}
