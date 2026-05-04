"use client";

import { useState } from "react";

const GOALS = [
  { value: "engagement", label: "Engagement" },
  { value: "conversion", label: "Conversion" },
];
const TYPES = [
  { value: "education", label: "Education" },
  { value: "promotion", label: "Promotion" },
];
const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
];
const MODES = [
  { value: "single", label: "Single Post" },
  { value: "carousel", label: "Carousel Post" },
  { value: "planner_daily", label: "Weekly Planner (7 days)" },
  { value: "planner_monthly", label: "Monthly Planner (30 days)" },
];

export default function Form({ onGenerate, loading }) {
  const [form, setForm] = useState({
    product: "",
    audience: "",
    painPoints: "",
    features: "",
    promotion: "",
    goal: "engagement",
    type: "education",
    platform: "instagram",
    mode: "single",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Content Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Product / Service *</label>
          <input
            type="text"
            required
            className="input-field"
            value={form.product}
            onChange={set("product")}
            placeholder="e.g. Online fitness coaching app"
          />
        </div>

        <div>
          <label className="label">Target Audience *</label>
          <input
            type="text"
            required
            className="input-field"
            value={form.audience}
            onChange={set("audience")}
            placeholder="e.g. Busy professionals aged 25–40"
          />
        </div>

        <div>
          <label className="label">Pain Points</label>
          <textarea
            className="input-field resize-none"
            rows={3}
            value={form.painPoints}
            onChange={set("painPoints")}
            placeholder="e.g. No time to exercise, lack of motivation, expensive gyms"
          />
        </div>

        <div>
          <label className="label">Key Features</label>
          <textarea
            className="input-field resize-none"
            rows={3}
            value={form.features}
            onChange={set("features")}
            placeholder="e.g. 15-min workouts, AI coach, flexible schedule"
          />
        </div>

        <div>
          <label className="label">Promotion / Offer</label>
          <input
            type="text"
            className="input-field"
            value={form.promotion}
            onChange={set("promotion")}
            placeholder="e.g. 30-day free trial, 50% off first month"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Content Goal</label>
            <select className="input-field" value={form.goal} onChange={set("goal")}>
              {GOALS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Content Type</label>
            <select className="input-field" value={form.type} onChange={set("type")}>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Platform</label>
            <select className="input-field" value={form.platform} onChange={set("platform")}>
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Output Mode</label>
            <select className="input-field" value={form.mode} onChange={set("mode")}>
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {(form.mode === "planner_daily" || form.mode === "planner_monthly") && (
          <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
            ✦ Content Planner requires a Pro or Business plan
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
          {loading ? "Generating..." : "Generate Content ✨"}
        </button>
      </form>
    </div>
  );
}
