"use client";
import { createContext } from "react";
import { Editor, TLEditorSnapshot } from "tldraw";
import { MyExtendedRecord } from "./layoutProvider";

export interface LayoutContextProps {
  shapes: MyExtendedRecord[];
  saveShapes: (snapshot: TLEditorSnapshot) => void;
  saveEditorInstance: (editor: Editor) => void;
  editor: Editor | null;
}

export const layoutContext = createContext({} as LayoutContextProps);
