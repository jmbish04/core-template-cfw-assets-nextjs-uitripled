import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    { 
      message: "Documentation endpoint active.",
      docs_url: "/docs"
    },
    { status: 200 }
  );
}
