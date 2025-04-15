import { Editor } from "tldraw";
import { LayoutState, MyExtendedRecord } from "./layoutProvider";

type UIActionType = {
  type: "UI - Save Shapes" | "UI - Save Editor";
  payload: MyExtendedRecord[] | Editor;
};

export const layoutReducer = (
  state: LayoutState,
  action: UIActionType
): LayoutState => {
  switch (action.type) {
    case "UI - Save Shapes":
      if (!Array.isArray(action.payload)) {
        throw new Error("Payload must be an array of shapes");
      } else {
        return {
          ...state,
          shapes: action.payload
        };
      }
    case "UI - Save Editor":
      if (!(action.payload instanceof Editor)) {
        throw new Error("Payload must be an instance of Editor");
      }
      return {
        ...state,
        editor: action.payload
      };
    default:
      return state;
  }
};
