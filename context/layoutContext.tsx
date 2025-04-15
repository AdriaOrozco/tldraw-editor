"use client";
import { createContext } from "react";
import { TLEditorSnapshot } from "tldraw";
import { MyExtendedRecord } from "./layoutProvider";

export interface LayoutContextProps {
  shapes: MyExtendedRecord[];
  saveShapes: (snapshot: TLEditorSnapshot) => void;
}

export const layoutContext = createContext({} as LayoutContextProps);
