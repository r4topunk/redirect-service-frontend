import HomePage from "@/components/pages/home";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <HomePage>{children}</HomePage>
    </SidebarProvider>
  );
}
