import { editorRouter, SnapshotSchema } from "@/app/api/trcp/editor";
import { NextRequest, NextResponse } from "next/server";

const createContextForApi = () => ({});
const createCaller = editorRouter.createCaller(createContextForApi);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    //Validate body using zod
    const parsedData = SnapshotSchema.parse(data);
    const result = await createCaller.saveSnapshot(parsedData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save snapshot " + error });
  }
}
