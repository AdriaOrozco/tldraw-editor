import { AppSidebar } from "@/components/app-sidebar";
import Editor from "@/components/Editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import "tldraw/tldraw.css";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Editor />
    </SidebarProvider>
  );
}
