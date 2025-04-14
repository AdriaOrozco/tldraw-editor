import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Tldraw Editor",
  description: "Simple editor with tldraw"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
