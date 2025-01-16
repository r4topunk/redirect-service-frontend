const SERVICE_API_KEY = process.env.SERVICE_API_KEY;
const SERVICE_URL = "https://redirect.ss-tm.org";
// const SERVICE_URL = "http://localhost:3000";

export type RouteType = {
  uuid: string;
  url: string;
  createdAt: string;
  link: string;
  description: string | null;
};

export async function fetchRoutes() {
  try {
    const req = await fetch(`${SERVICE_URL}/redirects`, {
      headers: {
        Authorization: SERVICE_API_KEY!,
      },
    });
    const routes = (await req.json()) as RouteType[];
    return { data: routes, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

interface RedirectInsertType {
  url: string;
  description: string | null;
}

export async function createRedirect(redirects: RedirectInsertType[]) {
  try {
    const req = await fetch(`${SERVICE_URL}/redirects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: SERVICE_API_KEY!,
      },
      body: JSON.stringify(redirects),
    });
    const json = await req.json();
    if (!req.ok) throw new Error(json?.message);
    return { data: json.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateRoute(
  uuid: string,
  url: string,
  description: string | null
) {
  try {
    const req = await fetch(`${SERVICE_URL}/redirects/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: SERVICE_API_KEY!,
      },
      body: JSON.stringify({ url, description }),
    });
    const route = (await req.json()) as RouteType;
    return { data: route, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
