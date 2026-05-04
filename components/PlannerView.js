"use client";

import { useState } from "react";

const LANGUAGES = [
  { key: "english", label: "EN" },
  { key: "malay", label: "MY" },
  { key: "chinese", label: "中文" },
];

const TYPE_COLORS = {
  education: "bg-blue-100 text-blue-700",
  promotion: "bg-orange-100 text-orange-700",
};

const GOAL_COLORS = {
  engagement: "bg-green-100 text-green-700",
  conversion: "bg-purple-100 text-purple-700",
};

function copyPost(content) {
  const text = [
    content.caption,
    Array.isArray(content.hashtags) ? content.hashtags.join(" ") : content.hashtags,
  ]
    .filter(Boolean)
    .join("\n\n");
  navigator.clipboard.writeText(text);
}

export default function PlannerView({ data }) {
  const [lang, setLang] = useState("english");
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);

  const posts = data?.posts || [];

  const handleCopy = (i, content) => {
    copyPost(content);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Content Planner</h2>
          <p className="text-sm text-gray-500">{posts.length} days of content ready</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {LANGUAGES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setLang(key)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                lang === key
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {posts.map((post, i) => {
          const content = post?.content?.[lang];
          const isOpen = expanded === i;
          const hashtags = Array.isArray(content?.hashtags)
            ? content.hashtags.join(" ")
            : content?.hashtags;

          return (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-left transition-colors"
              >
                <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                  {post.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded capitalize ${TYPE_COLORS[post.type] || "bg-gray-100 text-gray-600"}`}>
                      {post.type}
                    </span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded capitalize ${GOAL_COLORS[post.goal] || "bg-gray-100 text-gray-600"}`}>
                      {post.goal}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {post.angle || post.summary}
                  </p>
                </div>
                <span className="text-gray-400 text-sm shrink-0">{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && content && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {content.caption}
                    </p>
                    {hashtags && (
                      <p className="text-sm text-indigo-600">{hashtags}</p>
                    )}
                    {content.cta && (
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-indigo-700">{content.cta}</p>
                      </div>
                    )}
                    <button
                      onClick={() => handleCopy(i, content)}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {copied === i ? "Copied!" : "Copy post"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
