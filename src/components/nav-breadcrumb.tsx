"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const NavBreadcrumb = () => {
  const pathname = usePathname();
  const breadcrumbMap: { [key: string]: string } = {
    "/": "Dashboard",
    "/redirects": "Redirects",
  };
  const currentBreadcrumb = breadcrumbMap[pathname] || "Page";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{currentBreadcrumb}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumb;
