import {
  SHAPE_EDITOR_ICON,
  SHAPE_EDITOR_TOOL_ID
} from "@/constants/toolsConstants";
import { ShapeEditorTool } from "@/utils/ShapeEditorTool";
import editShapeIcon from "@/assets/shape-edit-icon.svg";
import {
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  TLComponents,
  TLUiAssetUrlOverrides,
  TLUiOverrides,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools
} from "tldraw";

/*
In order to make a custom tool appear on tldraw's toolbar.
There is a hook that overrides the default toolbar and keyboard shortcuts dialog.
*/

export const useToolbar = () => {
  //The uiOverrides object is used to override the default tools and toolbar.
  //We are going to add a new tool called "ShapeEditorTool" to the toolbar.
  const uiOverrides: TLUiOverrides = {
    tools(editor, tools) {
      // Create a tool item in the ui's context.
      tools.shapeEditor = {
        id: SHAPE_EDITOR_TOOL_ID,
        icon: SHAPE_EDITOR_ICON,
        label: "Edit Shape",
        kbd: "s",
        onSelect: () => {
          editor.setCurrentTool(SHAPE_EDITOR_TOOL_ID);
        }
      };
      return tools;
    }
  };

  //components object is used to override the default components.
  //Also we are giving the new tool a style when it is selected.
  const components: TLComponents = {
    Toolbar: props => {
      const tools = useTools();
      const isShapeEditorSelected = useIsToolSelected(
        tools[SHAPE_EDITOR_TOOL_ID]
      );
      return (
        <DefaultToolbar {...props}>
          <TldrawUiMenuItem
            {...tools[SHAPE_EDITOR_TOOL_ID]}
            isSelected={isShapeEditorSelected}
          />
          <DefaultToolbarContent />
        </DefaultToolbar>
      );
    },
    //We can use DefaultKeyboardShortcutsDialog with DefaultKeyboardShortcutsDialogContent,
    //to customize the keyboard shortcuts dialog.
    KeyboardShortcutsDialog: props => {
      const tools = useTools();
      return (
        <DefaultKeyboardShortcutsDialog {...props}>
          <DefaultKeyboardShortcutsDialogContent />
          {/* Ideally, we'd interleave this into the tools group */}
          <TldrawUiMenuItem {...tools[SHAPE_EDITOR_TOOL_ID]} />
        </DefaultKeyboardShortcutsDialog>
      );
    }
  };

  // The customAssetUrls object is used to override the default asset urls.
  const customAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
      "shape-editor-icon": editShapeIcon.src
    }
  };

  //Define de customTools array.
  const customTools = [ShapeEditorTool];

  return {
    uiOverrides,
    components,
    customAssetUrls,
    customTools
  };
};
