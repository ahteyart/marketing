import { NextResponse } from "next/server";
import { generateContentChain } from "@/services/contentChain";

export async function POST(request) {
  const body = await request.json();
  const { product, audience, painPoints, features, promotion, goal, type, platform, mode } = body;

  if (!product || !audience || !mode) {
    return NextResponse.json(
      { error: "Product, audience, and mode are required." },
      { status: 400 }
    );
  }

  try {
    const output = await generateContentChain({
      product,
      audience,
      painPoints,
      features,
      promotion,
      goal,
      type,
      platform,
      mode,
    });

    return NextResponse.json(output);
  } catch (err) {
    console.error("[generate-chain]", err);
    return NextResponse.json(
      { error: "Content generation failed. Please try again." },
      { status: 500 }
    );
  }
}
