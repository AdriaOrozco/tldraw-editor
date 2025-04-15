import { StateNode, TLPointerEventInfo } from "tldraw";
import { SHAPE_EDITOR_TOOL_ID } from "../constants/toolsConstants";
import { changeShape } from "./functions";

//We extend the `StateNode` class to create a new tool called `ShapeEditorTool`.
export class ShapeEditorTool extends StateNode {
  static override id = SHAPE_EDITOR_TOOL_ID;

  //The onEnter method is called when the tool is activated.
  override onEnter() {
    this.editor.setCursor({ type: "default", rotation: 0 });
  }

  //The onPointerDown method is called when the user clicks on the canvas.
  override onPointerDown(info: TLPointerEventInfo) {
    //get all shapes on the current page

    const shapes = this.editor.getCurrentPageShapes();
    //Cause of the sidebar width we have to move the point to the left
    for (const shape of shapes) {
      //Click point to canvas coordinates
      const pagePoint = this.editor.screenToPage(info.point);
      //get the bounds of the shape
      const bounds = this.editor.getShapePageBounds(shape.id);
      //get the geometry of the shape
      const geometry = this.editor.getShapeGeometry(shape);
      //convert the point to the shape's local space
      const localPoint = this.editor.getPointInShapeSpace(shape, pagePoint);

      //check if the click is just in the shape's line or if the click is inside the shape
      if (
        geometry.hitTestPoint(localPoint, 2) ||
        bounds?.containsPoint(pagePoint)
      ) {
        const result = changeShape(this.editor, shape);
        if (result) {
          break;
        }
      }
    }
  }
}
