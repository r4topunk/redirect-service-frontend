"use client";

import InsertRedirectDialog from "@/components/redirects/insert-dialog";
import RedirectRow from "@/components/redirects/redirect-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RedirectType } from "@/lib/redirect";
import { useState } from "react";

interface RedirectPageProps {
  redirects: RedirectType[];
}

function RedirectPage({ redirects: defaultRedirect }: RedirectPageProps) {
  const [redirects, setRedirects] = useState(defaultRedirect);

  return (
    <div className="p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full">
      <InsertRedirectDialog setRedirects={setRedirects} />
      <Table className="max-w-full rounded-sm overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Redirect</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {redirects.map((route) => (
            <RedirectRow key={route.uuid} route={route} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RedirectPage;
