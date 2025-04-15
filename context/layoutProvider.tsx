"use client";
import { FC, useReducer } from "react";
import { layoutContext } from "./layoutContext";
import { layoutReducer } from "./layoutReducer";
import { Editor, TLEditorSnapshot, TLRecord } from "tldraw";

export type MyExtendedRecord = TLRecord & {
  props?: {
    geo?: string;
  };
  type?: string;
};

export type LayoutState = {
  shapes: MyExtendedRecord[];
  editor: Editor | null;
};

const LAYOUT_INITIAL_STATE: LayoutState = {
  shapes: [],
  editor: null
};

type ContentProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<ContentProps> = ({
  children
}: ContentProps) => {
  const [state, dispatch] = useReducer(layoutReducer, LAYOUT_INITIAL_STATE);

  const saveShapes = (snapshot: TLEditorSnapshot) => {
    const shapes = Object.entries(snapshot.document.store)
      .filter(([key]) => key.startsWith("shape:"))
      .map(([, shape]) => {
        return shape;
      });
    dispatch({ type: "UI - Save Shapes", payload: shapes });
  };

  const saveEditorInstance = (editor: Editor) => {
    dispatch({ type: "UI - Save Editor", payload: editor });
  };

  return (
    <layoutContext.Provider
      value={{
        ...state,
        shapes: state.shapes,
        saveEditorInstance,
        saveShapes
      }}
    >
      {children}
    </layoutContext.Provider>
  );
};
