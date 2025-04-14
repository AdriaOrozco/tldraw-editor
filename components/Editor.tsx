"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useToolbar } from "../hooks/useToolbar";

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
      />
    </div>
  );
}
