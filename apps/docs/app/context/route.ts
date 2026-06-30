import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    { 
      name: "uitripled-docs", 
      version: "1.0.0",
      architecture: "edge",
      framework: "next.js"
    },
    { status: 200 }
  );
}
