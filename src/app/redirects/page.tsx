import RedirectPage from "@/components/pages/redirect";
import { fetchRoutes } from "@/lib/redirect";

export const revalidate = 0;

async function RedirectsPage() {
  const { data: routes, error } = await fetchRoutes();

  if (error || !routes) {
    console.error("Failed to fetch routes:", error);
    return <div>Failed to fetch routes</div>;
  }

  return <RedirectPage redirects={routes} />;
}

export default RedirectsPage;
