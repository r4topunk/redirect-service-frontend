import RedirectRow from "@/components/redirects/redirect-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchRoutes } from "@/lib/redirect";
import InsertRedirectDialog from "@/components/redirects/insert-dialog";

async function RedirectsPage() {
  const { data: routes, error } = await fetchRoutes();

  if (error || !routes) {
    console.error("Failed to fetch routes:", error);
    return <div>Failed to fetch routes</div>;
  }

  return (
    <div className="p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full">
      <InsertRedirectDialog />
      <Table className="max-w-full rounded-sm overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Redirect</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <RedirectRow key={route.uuid} route={route} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RedirectsPage;
