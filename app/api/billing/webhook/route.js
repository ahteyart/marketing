import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function priceIdToPlan(priceId) {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "pro";
  if (priceId === process.env.STRIPE_BUSINESS_PRICE_ID) return "business";
  return "free";
}

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const checkoutSession = event.data.object;
      if (checkoutSession.mode !== "subscription") break;

      const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);
      const priceId = subscription.items.data[0].price.id;

      await prisma.user.update({
        where: { stripeCustomerId: checkoutSession.customer },
        data: {
          plan: priceIdToPlan(priceId),
          stripeSubscriptionId: checkoutSession.subscription,
          stripePriceId: priceId,
        },
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const priceId = subscription.items.data[0].price.id;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: priceIdToPlan(priceId), stripePriceId: priceId },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: "free", stripeSubscriptionId: null, stripePriceId: null },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
