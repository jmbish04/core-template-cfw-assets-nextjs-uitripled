import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the Cloudflare Environment bindings
  const env = getRequestContext().env;

  // Dynamically resolve the provider-specific AI Gateway URL
  const gatewayUrl = await env.AI.gateway(env.GATEWAY_ID).getUrl("openai");

  // Initialize the standard OpenAI SDK using the gateway URL
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
    baseURL: gatewayUrl,
  });

  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Inference request failed." },
      { status: 500 }
    );
  }
}
