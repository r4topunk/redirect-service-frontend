"use client";

import { ConnectButton } from "@/components/connect-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log({ pathname });
  return (
    <>
      <div className="fixed bottom-2 w-full flex items-end justify-center gap-2">
        {pathname !== "/user/register" && <ConnectButton />}
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
