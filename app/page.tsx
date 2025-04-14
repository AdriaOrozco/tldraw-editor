import { AppSidebar } from "@/components/app-sidebar";
import Editor from "@/components/Editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import "tldraw/tldraw.css";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/editor/get");
  const json = await res.json();

  return (
    <SidebarProvider>
      <AppSidebar />
      <Editor loadedSnapshot={json.snapshot} />
    </SidebarProvider>
  );
}
