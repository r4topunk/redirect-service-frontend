"use client";

import { ConnectButton } from "@/components/connect-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const account = useActiveAccount();
  return (
    <>
      <div className="fixed bottom-2 w-full flex items-end justify-center gap-2">
        {(pathname !== "/user/register" &&
          !pathname.startsWith("/user/edit")) ||
        account ? (
          <ConnectButton />
        ) : null}
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
