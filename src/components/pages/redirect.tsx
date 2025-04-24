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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RedirectPageProps {
  redirects: RedirectType[];
}

function RedirectPage({ redirects: defaultRedirect }: RedirectPageProps) {
  const [redirects, setRedirects] = useState(defaultRedirect);
  const [selectedProject, setSelectedProject] = useState("All projects");

  // Compute unique projects from the available redirects
  const projectNames = Array.from(
    new Set(redirects.map((r) => r.project?.name).filter(Boolean))
  );

  const filteredRedirects =
    selectedProject === "All projects"
      ? redirects
      : redirects.filter((r) => r.project?.name === selectedProject);

  return (
    <div className="p-4 flex-1 rounded-xl bg-muted/50 md:min-h-min w-full">
      <div className="flex justify-between items-center mb-4">
        <Select
          value={selectedProject}
          onValueChange={(value) => setSelectedProject(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All projects">All projects</SelectItem>
            {projectNames.map((name) => (
              <SelectItem key={name as string} value={name as string}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <InsertRedirectDialog setRedirects={setRedirects} />
      </div>

      <Table className="max-w-full rounded-sm overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>UUID</TableHead>
            <TableHead className="whitespace-nowrap">Created at</TableHead>
            <TableHead>Redirect</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRedirects.map((route) => (
            <RedirectRow key={route.uuid} route={route} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RedirectPage;
