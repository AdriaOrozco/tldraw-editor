import { LayoutState, MyExtendedRecord } from "./layoutProvider";

type UIActionType = { type: "UI - Save Shapes"; payload: MyExtendedRecord[] };

export const layoutReducer = (
  state: LayoutState,
  action: UIActionType
): LayoutState => {
  switch (action.type) {
    case "UI - Save Shapes":
      return {
        ...state,
        shapes: action.payload
      };

    default:
      return state;
  }
};
