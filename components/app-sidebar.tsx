import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { TLEditorSnapshot } from "tldraw";
import { useMemo } from "react";

export function AppSidebar({
  loadedSnapshot
}: {
  loadedSnapshot: TLEditorSnapshot | undefined;
}) {
  const shapes = useMemo(() => {
    if (!loadedSnapshot) return [];
    return Object.entries(loadedSnapshot.document.store)
      .filter(([key]) => key.startsWith("shape:"))
      .map(([, shape]) => {
        return shape;
      });
  }, [loadedSnapshot]);
  console.log(shapes);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Custom Tldraw Editor</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Layers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {shapes.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <span>
                      <span>
                        {
                          //@ts-expect-error show geo on shapes
                          item.props.geo ?
                            //@ts-expect-error show geo on shapes
                            item.props.geo
                            //@ts-expect-error show type on shapes
                          : item.type
                        }
                      </span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
