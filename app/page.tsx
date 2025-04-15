import { AppSidebar } from "@/components/app-sidebar";
import Editor from "@/components/Editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layoutProvider";
import "tldraw/tldraw.css";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/editor/get");
  const json = await res.json();

  return (
    <SidebarProvider>
      <LayoutProvider>
        <AppSidebar />
        <Editor loadedSnapshot={json.snapshot} />
      </LayoutProvider>
    </SidebarProvider>
  );
}
