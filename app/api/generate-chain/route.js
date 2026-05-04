import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateContentChain } from "@/services/contentChain";

const PLAN_LIMITS = {
  free: 5,
  pro: 100,
  business: Infinity,
};

const PLANNER_PLANS = ["pro", "business"];

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { product, audience, painPoints, features, promotion, goal, type, platform, mode } = body;

  if (!product || !audience || !mode) {
    return NextResponse.json({ error: "Product, audience, and mode are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, generationsThisMonth: true, usagePeriodStart: true },
  });

  // Reset counter at the start of a new calendar month
  const now = new Date();
  const periodStart = new Date(user.usagePeriodStart);
  if (
    now.getMonth() !== periodStart.getMonth() ||
    now.getFullYear() !== periodStart.getFullYear()
  ) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { generationsThisMonth: 0, imagesThisMonth: 0, usagePeriodStart: now },
    });
    user.generationsThisMonth = 0;
  }

  const limit = PLAN_LIMITS[user.plan] ?? PLAN_LIMITS.free;
  if (user.generationsThisMonth >= limit) {
    return NextResponse.json(
      { error: `You have reached your monthly limit of ${limit} generations. Please upgrade your plan.` },
      { status: 429 }
    );
  }

  if ((mode === "planner_daily" || mode === "planner_monthly") && !PLANNER_PLANS.includes(user.plan)) {
    return NextResponse.json(
      { error: "Content Planner requires a Pro or Business plan. Please upgrade to unlock this feature." },
      { status: 403 }
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

    await Promise.all([
      prisma.contentHistory.create({
        data: {
          userId: session.user.id,
          product,
          mode,
          platform: platform || "instagram",
          output,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { generationsThisMonth: { increment: 1 } },
      }),
    ]);

    return NextResponse.json(output);
  } catch (err) {
    console.error("[generate-chain]", err);
    return NextResponse.json(
      { error: "Content generation failed. Please try again." },
      { status: 500 }
    );
  }
}
