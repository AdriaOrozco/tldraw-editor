import { layoutContext } from "@/context/layoutContext";
import { useContext, useEffect, useRef } from "react";
import { TLEditorSnapshot, useEditor } from "tldraw";

export const useCanvasInfo = () => {
  function AutoSave() {
    const editor = useEditor();
    const { saveShapes } = useContext(layoutContext);
    const prevSnapshotRef = useRef<string | null>(null);

    useEffect(() => {
      const saveIfChanged = () => {
        const snapshot = editor.getSnapshot();
        //To compare changes
        const snapshotString = JSON.stringify(snapshot);

        //Compare the current snapshot with the previous one to see if it has actually changed
        if (prevSnapshotRef.current !== snapshotString) {
          prevSnapshotRef.current = snapshotString;
          saveSnapshotToAPI(snapshot);
          saveShapes(snapshot);
        }
      };
      //to avoid unnecessary renders we use the editor store to listen to changes
      const unsubscribe = editor.store.listen(saveIfChanged, {
        source: "user"
      });

      //Clean up function on unmount or when the editor changes
      return () => unsubscribe();
    }, [editor, saveShapes]);

    return null;
  }

  function AutoLoad({
    loadedSnapshot
  }: {
    loadedSnapshot: TLEditorSnapshot | undefined;
  }) {
    const editor = useEditor();
    const { saveShapes } = useContext(layoutContext);

    useEffect(() => {
      if (loadedSnapshot) {
        try {
          editor.loadSnapshot(loadedSnapshot);
          // Save the loaded snapshot to the context
          saveShapes(loadedSnapshot);
        } catch (e) {
          console.error("Error loading snapshot:", e);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    //there is no need to return anything here because we are not reendering anything
    return null;
  }

  const saveSnapshotToAPI = async (snapshot: TLEditorSnapshot) => {
    try {
      const response = await fetch("/api/editor/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snapshot)
      });

      if (!response.ok) {
        throw new Error("Error saving snapshot");
      }
    } catch (error) {
      console.error("Error saving snapshot:", error);
    }
  };

  function EditorInstance() {
    const editor = useEditor();
    const { saveEditorInstance } = useContext(layoutContext);
    useEffect(() => {
      saveEditorInstance(editor);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);
    return null;
  }

  return {
    AutoSave,
    AutoLoad,
    EditorInstance
  };
};
