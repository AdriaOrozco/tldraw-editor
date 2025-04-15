import { AppSidebar } from "@/components/app-sidebar";
import Editor from "@/components/Editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layoutProvider";
import "tldraw/tldraw.css";
import Error from "./error";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/editor/get"
  );
  const json = await res.json();
  if (!json.success) {
    return <Error error={json.message} />;
  }

  return (
    <SidebarProvider>
      <LayoutProvider>
        <AppSidebar />
        <Editor loadedSnapshot={json.snapshot} />
      </LayoutProvider>
    </SidebarProvider>
  );
}
