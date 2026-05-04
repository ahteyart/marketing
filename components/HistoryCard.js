"use client";

import { useState } from "react";

const MODE_STYLES = {
  single: "bg-blue-100 text-blue-700",
  carousel: "bg-purple-100 text-purple-700",
  planner_daily: "bg-green-100 text-green-700",
  planner_monthly: "bg-emerald-100 text-emerald-700",
};

const MODE_LABELS = {
  single: "Single Post",
  carousel: "Carousel",
  planner_daily: "Weekly Plan",
  planner_monthly: "Monthly Plan",
};

export default function HistoryCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const firstPost = item.output?.posts?.[0]?.content?.english;
  const hashtags = firstPost
    ? Array.isArray(firstPost.hashtags)
      ? firstPost.hashtags.slice(0, 5).join(" ")
      : firstPost.hashtags
    : null;

  return (
    <div
      className="card cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${MODE_STYLES[item.mode] || "bg-gray-100 text-gray-600"}`}>
              {MODE_LABELS[item.mode] || item.mode}
            </span>
            <span className="text-xs text-gray-400 capitalize">{item.platform}</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 truncate">{item.product}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <span className="text-gray-400 text-sm shrink-0 mt-1">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Preview (English)</p>
          {firstPost?.caption && (
            <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">{firstPost.caption}</p>
          )}
          {hashtags && (
            <p className="text-xs text-indigo-500">{hashtags}</p>
          )}
          <p className="text-xs text-gray-400 pt-1">
            {item.output?.posts?.length || 0} post
            {(item.output?.posts?.length || 0) !== 1 ? "s" : ""} generated
          </p>
        </div>
      )}
    </div>
  );
}
