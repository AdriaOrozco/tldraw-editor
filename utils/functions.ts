import { GEO_TYPES } from "@/constants/toolsConstants";
import { MyExtendedRecord } from "@/context/layoutProvider";
import { Editor, TLShapeId } from "tldraw";

export const changeShape = (
  editor: Editor,
  shape: MyExtendedRecord
): boolean => {
  if (shape.props) {
    if (shape.props.geo) {
      const currentIndex = GEO_TYPES.indexOf(shape.props.geo);
      const nextIndex = (currentIndex + 1) % GEO_TYPES.length;
      const nextGeoForm = GEO_TYPES[nextIndex];
      //Modify the shape's geometry
      editor.updateShape({
        id: shape.id as TLShapeId,
        type: shape.type as string,
        props: {
          ...shape.props,
          geo: nextGeoForm
        }
      });
      return true;
    }
  }
  return false;
};
