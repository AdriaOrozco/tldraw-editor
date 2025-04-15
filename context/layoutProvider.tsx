"use client";
import { FC, useReducer } from "react";
import { layoutContext } from "./layoutContext";
import { layoutReducer } from "./layoutReducer";
import { TLEditorSnapshot, TLRecord } from "tldraw";

export type MyExtendedRecord = TLRecord & {
  props?: {
    geo?: string;
  };
  type?: string;
};

export type LayoutState = {
  shapes: MyExtendedRecord[];
};

const LAYOUT_INITIAL_STATE: LayoutState = {
  shapes: []
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

  return (
    <layoutContext.Provider
      value={{
        ...state,
        shapes: state.shapes,
        saveShapes
      }}
    >
      {children}
    </layoutContext.Provider>
  );
};
