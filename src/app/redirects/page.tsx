"use client";

import RedirectRow from "@/components/redirects/redirect-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteType } from "@/lib/redirect";
import { useEffect, useState } from "react";

function RedirectsPage() {
  const [routes, setRoutes] = useState<RouteType[]>([]);

  async function getRoutes() {
    try {
      const response = await fetch("/api/redirect/routes");
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const routes = await response.json();
      setRoutes(routes.data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  }

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <div className="p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full">
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
