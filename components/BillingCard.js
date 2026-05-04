"use client";

import { useState } from "react";

export default function BillingCard({ plan, currentPlan, hasSubscription }) {
  const [loading, setLoading] = useState(false);
  const isCurrentPlan = currentPlan === plan.name.toLowerCase();

  const handleSubscribe = async () => {
    if (!plan.priceId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div
      className={`card relative flex flex-col ${
        plan.popular ? "ring-2 ring-indigo-500" : ""
      } ${isCurrentPlan ? "ring-2 ring-green-500" : ""}`}
    >
      {plan.popular && !isCurrentPlan && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Current Plan
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{plan.description}</p>
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
          {plan.price > 0 && (
            <span className="text-gray-500 text-sm font-medium">/month</span>
          )}
        </div>
      </div>

      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
            <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {plan.price === 0 ? (
        <button disabled className="btn-secondary w-full opacity-60 cursor-default">
          {isCurrentPlan ? "Current Plan" : "Free — No card needed"}
        </button>
      ) : isCurrentPlan && hasSubscription ? (
        <button onClick={handleManage} disabled={loading} className="btn-secondary w-full">
          {loading ? "Loading..." : "Manage Subscription"}
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={loading || !plan.priceId}
          className="btn-primary w-full"
        >
          {loading ? "Redirecting..." : `Upgrade to ${plan.name}`}
        </button>
      )}
    </div>
  );
}
