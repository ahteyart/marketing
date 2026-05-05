import { NextResponse } from "next/server";
import { generateImage } from "@/services/imageService";

export async function POST(request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  try {
    const imageData = await generateImage(prompt);
    return NextResponse.json(imageData);
  } catch (err) {
    console.error("[generate-image]", err);
    return NextResponse.json({ error: err.message || "Failed to generate image." }, { status: 500 });
  }
}
