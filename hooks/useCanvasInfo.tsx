import { useEffect } from "react";
import { TLEditorSnapshot, useEditor } from "tldraw";

export const useCanvasInfo = () => {
  function AutoSave() {
    const editor = useEditor();

    useEffect(() => {
      //to avoid unnecessary renders we use the editor store to listen to changes
      const unsubscribe = editor.store.listen(
        () => {
          const snapshot = editor.getSnapshot();
          saveSnapshotToAPI(snapshot);
        },
        { source: "user" }
      );
      //Clean up function on unmount or when the editor changes
      return () => unsubscribe();
    }, [editor]);

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

  function AutoLoad({
    loadedSnapshot
  }: {
    loadedSnapshot: TLEditorSnapshot | undefined;
  }) {
    const editor = useEditor();
    useEffect(() => {
      if (loadedSnapshot) {
        try {
          editor.loadSnapshot(loadedSnapshot);
        } catch (e) {
          console.error("Error loading snapshot:", e);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    //there is no need to return anything here because we are not reendering anything
    return null;
  }

  return {
    AutoSave,
    AutoLoad
  };
};
