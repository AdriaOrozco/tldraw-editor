import { StateNode, TLTextShape, toRichText } from "tldraw";
import { SHAPE_EDITOR_TOOL_ID } from "../constants/toolsConstants";

const OFFSET = 12;
//We extend the `StateNode` class to create a new tool called `ShapeEditorTool`.
export class ShapeEditorTool extends StateNode {
  static override id = SHAPE_EDITOR_TOOL_ID;

  //The onEnter method is called when the tool is activated.
  override onEnter() {
    this.editor.setCursor({ type: "default", rotation: 0 });
  }
  //The onPointerDown method is called when the user clicks on the canvas.
  //At the moment, it creates a new text shape at the current page point.
  override onPointerDown() {
    const { currentPagePoint } = this.editor.inputs;
    this.editor.createShape<TLTextShape>({
      type: "text",
      x: currentPagePoint.x - OFFSET,
      y: currentPagePoint.y - OFFSET,
      props: { richText: toRichText("TEST") }
    });
  }
}
