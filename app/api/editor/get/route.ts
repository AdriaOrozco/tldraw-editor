import { editorRouter } from "@/app/api/trcp/editor";
import { NextResponse } from "next/server";

const createContextForApi = () => ({});
const createCaller = editorRouter.createCaller(createContextForApi);

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay
    const result = await createCaller.getSnapshot(); // tRPC Endpointto get snapshot
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch snapshot",
        message: error
      },
      { status: 500 }
    );
  }
}
