import { ThemeToggle } from "@/components/theme-toggle";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute right-4 bottom-4">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
