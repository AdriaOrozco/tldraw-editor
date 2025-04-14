import { StateNode, TLPointerEventInfo } from "tldraw";
import { GEO_TYPES, SHAPE_EDITOR_TOOL_ID } from "../constants/toolsConstants";

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
        console.log("Shape clicked:", shape);
        //@ts-expect-error all shapes have the geo pror except the text
        if (shape.props.geo) {
          //@ts-expect-error all shapes have the geo pror except the text
          const currentIndex = GEO_TYPES.indexOf(shape.props.geo);
          console.log("currentIndex", currentIndex);
          const nextIndex = (currentIndex + 1) % GEO_TYPES.length;
          const nextGeoForm = GEO_TYPES[nextIndex];
          //Modify the shape's geometry
          this.editor.updateShape({
            id: shape.id,
            type: shape.type,
            props: {
              ...shape.props,
              geo: nextGeoForm
            }
          });
          break;
        }
      }
    }
  }
}
