"use client";
import { Tldraw, TLEditorSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { useToolbar } from "../hooks/useToolbar";
import { useCanvasInfo } from "@/hooks/useCanvasInfo";

export default function Editor({
  loadedSnapshot
}: {
  loadedSnapshot: TLEditorSnapshot | undefined;
}) {
  const { customTools, uiOverrides, components, customAssetUrls } =
    useToolbar();
  const { AutoSave, AutoLoad, EditorInstance } = useCanvasInfo();
  return (
    <div className="h-screen w-full md:w-[calc(100vw-255px)]">
      <Tldraw
        //Custom tool classes
        tools={customTools}
        //Custom UI overrides
        overrides={uiOverrides}
        //Custom components
        components={components}
        //Custom asset URLs
        assetUrls={customAssetUrls}
      >
        <AutoLoad loadedSnapshot={loadedSnapshot} />
        <AutoSave />
        <EditorInstance />
      </Tldraw>
    </div>
  );
}
