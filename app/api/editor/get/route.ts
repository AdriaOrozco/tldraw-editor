import { editorRouter } from "@/app/api/trcp/editor";
import { NextResponse } from "next/server";

const createContextForApi = () => ({});
const createCaller = editorRouter.createCaller(createContextForApi);

export async function GET() {
  try {
    const result = await createCaller.getSnapshot(); // tRPC Endpointto get snapshot
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch snapshot " + error });
  }
}
