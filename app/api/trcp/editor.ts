import { z } from "zod";
import { publicProcedure, router } from "./trcp";
import fs from "fs";
import path from "path";

//Scheme for document object
const DocumentSchema = z.object({
  store: z.record(z.unknown()),
  schema: z.record(z.unknown())
});

//Scheme for session object
const SessionSchema = z.object({
  version: z.number(),
  currentPageId: z.string(),
  exportBackground: z.boolean(),
  isFocusMode: z.boolean(),
  isDebugMode: z.boolean(),
  isToolLocked: z.boolean(),
  isGridMode: z.boolean(),
  pageStates: z.array(z.unknown())
});

//Scheme for the entire snapshot
export const SnapshotSchema = z.object({
  document: DocumentSchema,
  session: SessionSchema
});

type Snapshot = z.infer<typeof SnapshotSchema>;
export const editorRouter = router({
  getSnapshot: publicProcedure.query(
    async (): Promise<
      | { success: true; snapshot: undefined }
      | { success: true; snapshot: Snapshot }
      | { success: false; message: string }
    > => {
      try {
        //route where the file is located
        const filePath = path.join(process.cwd(), "fake-bd", "data.json");

        //check if the file exists
        if (!fs.existsSync(filePath)) {
          return { success: true, snapshot: undefined };
        }

        //load the file
        const data = fs.readFileSync(filePath, "utf-8");

        //parse the file
        const snapshot = JSON.parse(data);

        //validate the snapshot using zod
        const parsedSnapshot = SnapshotSchema.parse(snapshot);
        return { success: true, snapshot: parsedSnapshot };
      } catch (error) {
        console.error("Error al leer el snapshot:", error);
        return { success: false, message: "Error al leer el snapshot." };
      }
    }
  ),

  //POST route to save canvas info
  saveSnapshot: publicProcedure
    .input(SnapshotSchema)
    .mutation(async ({ input }) => {
      const snapshot = input;
      try {
        //Route where the file will be saved
        const filePath = path.join(process.cwd(), "fake-bd", "data.json");

        //If the directory does not exist, create it
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        //Snapshot to JSON and save it
        fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2));
        return { success: true, message: "Snapshot saved" };
      } catch (error) {
        return { success: false, message: "Error saving snapshot. " + error };
      }
    })
});
