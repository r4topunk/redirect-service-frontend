import { ConnectButton } from "@/components/connect-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed bottom-2 w-full flex items-end justify-center gap-2">
        <ConnectButton />
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
