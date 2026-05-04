import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BillingCard from "@/components/BillingCard";

export const dynamic = "force-dynamic";

const PLANS = [
  {
    name: "Free",
    price: 0,
    priceId: null,
    description: "Get started with AI content generation",
    features: [
      "5 content generations/month",
      "Single & Carousel posts",
      "3 output languages",
      "Content history saved",
    ],
  },
  {
    name: "Pro",
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || null,
    description: "For creators and small businesses",
    popular: true,
    features: [
      "100 content generations/month",
      "All post modes incl. Planner",
      "3 output languages",
      "50 AI-generated images/month",
      "Priority AI model",
    ],
  },
  {
    name: "Business",
    price: 79,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || null,
    description: "For agencies and power users",
    features: [
      "Unlimited content generations",
      "All post modes",
      "3 output languages",
      "Unlimited AI images",
      "Fastest AI model",
      "Priority support",
    ],
  },
];

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      generationsThisMonth: true,
      imagesThisMonth: true,
      stripeSubscriptionId: true,
    },
  });

  const currentPlanData = PLANS.find((p) => p.name.toLowerCase() === user.plan) || PLANS[0];
  const genLimit = user.plan === "free" ? 5 : user.plan === "pro" ? 100 : "∞";
  const imgLimit = user.plan === "free" ? 0 : user.plan === "pro" ? 50 : "∞";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing &amp; Plans</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and usage</p>
      </div>

      <div className="card">
        <h2 className="text-base font-semibold text-gray-900 mb-4">This Month&apos;s Usage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-sm text-indigo-600 font-medium">Generations</p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">
              {user.generationsThisMonth}
              <span className="text-sm font-normal text-indigo-400">/{genLimit}</span>
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-600 font-medium">Images</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {user.imagesThisMonth}
              <span className="text-sm font-normal text-purple-400">/{imgLimit}</span>
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-600 font-medium">Current Plan</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{currentPlanData.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <BillingCard
            key={plan.name}
            plan={plan}
            currentPlan={user.plan}
            hasSubscription={!!user.stripeSubscriptionId}
          />
        ))}
      </div>
    </div>
  );
}
