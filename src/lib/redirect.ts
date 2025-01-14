const SERVICE_API_KEY = process.env.SERVICE_API_KEY;
const SERVICE_URL = "https://redirect.ss-tm.org";
// const SERVICE_URL = "http://localhost:3001";

export type RouteType = {
  uuid: string;
  url: string;
  createdAt: string;
  link: string;
};

export async function fetchRoutes() {
  try {
    const req = await fetch(`${SERVICE_URL}/routes`, {
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
