"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useToolbar } from "../hooks/useToolbar";
import { useEffect } from "react";
import { useEditor } from "tldraw";

function AutoSave() {
  const editor = useEditor();
  useEffect(() => {
    //to avoid unnecessary renders we use the editor store to listen to changes
    const unsubscribe = editor.store.listen(
      () => {
        const snapshot = editor.getSnapshot();
        localStorage.setItem("tldrawDocument", JSON.stringify(snapshot));
      },
      { source: "user" }
    );
    //Clean up function on unmount or when the editor changes
    return () => unsubscribe();
  }, [editor]);

  return null;
}

function AutoLoad() {
  const editor = useEditor();
  useEffect(() => {
    const saved = localStorage.getItem("tldrawDocument");
    if (saved) {
      try {
        const snapshot = JSON.parse(saved);
        editor.loadSnapshot(snapshot);
      } catch (e) {
        console.error("Error al cargar el snapshot guardado:", e);
      }
    }
  }, [editor]);

  //there is no need to return anything here because we are not reendering anything
  return null;
}

export default function Editor() {
  const { customTools, uiOverrides, components, customAssetUrls } =
    useToolbar();

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
        <AutoLoad />
        <AutoSave />
      </Tldraw>
    </div>
  );
}
