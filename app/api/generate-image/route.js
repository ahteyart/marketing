import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateImage } from "@/services/imageService";

const IMAGE_LIMITS = {
  free: 0,
  pro: 50,
  business: Infinity,
};

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, imagesThisMonth: true },
  });

  const limit = IMAGE_LIMITS[user.plan] ?? IMAGE_LIMITS.free;
  if (user.imagesThisMonth >= limit) {
    return NextResponse.json(
      {
        error:
          user.plan === "free"
            ? "Image generation requires a Pro or Business plan."
            : "You have reached your monthly image generation limit.",
      },
      { status: 403 }
    );
  }

  const { prompt, type } = await request.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  try {
    const imageData = await generateImage(prompt, type || "ad");

    await Promise.all([
      prisma.generatedImage.create({
        data: {
          userId: session.user.id,
          prompt,
          imageUrl: imageData.base64 ? `data:image/png;base64,${imageData.base64}` : (imageData.url || ""),
          type: type || "ad",
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { imagesThisMonth: { increment: 1 } },
      }),
    ]);

    return NextResponse.json(imageData);
  } catch (err) {
    console.error("[generate-image]", err);
    return NextResponse.json({ error: err.message || "Failed to generate image." }, { status: 500 });
  }
}
