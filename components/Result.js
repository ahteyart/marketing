"use client";

import { useState } from "react";

const LANGUAGES = [
  { key: "english", label: "EN" },
  { key: "malay", label: "MY" },
  { key: "chinese", label: "中文" },
];

function copyToClipboard(content, isCarousel) {
  const text = isCarousel
    ? content.slides
        ?.map((s, i) => `Slide ${i + 1}: ${s.headline}\n${s.body || s.content}`)
        .join("\n\n")
    : [
        content.caption,
        Array.isArray(content.hashtags) ? content.hashtags.join(" ") : content.hashtags,
      ]
        .filter(Boolean)
        .join("\n\n");
  navigator.clipboard.writeText(text || "");
}

export default function Result({ data }) {
  const [lang, setLang] = useState("english");
  const [copied, setCopied] = useState(false);

  const post = data?.posts?.[0];
  const content = post?.content?.[lang];

  if (!post || !content) return null;

  const isCarousel = Array.isArray(content.slides);
  const hashtags = Array.isArray(content.hashtags)
    ? content.hashtags.join(" ")
    : content.hashtags;

  const handleCopy = () => {
    copyToClipboard(content, isCarousel);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {isCarousel ? "Carousel Post" : "Generated Post"}
        </h2>
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

      {isCarousel ? (
        <div className="space-y-3">
          {content.slides.map((slide, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-white bg-indigo-500 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {slide.headline && (
                  <span className="text-sm font-semibold text-gray-800">{slide.headline}</span>
                )}
              </div>
              {(slide.body || slide.content) && (
                <p className="text-sm text-gray-700 ml-8">{slide.body || slide.content}</p>
              )}
            </div>
          ))}
          {content.caption && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Caption</p>
              <p className="text-sm text-gray-700">{content.caption}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{content.caption}</p>
          </div>
          {hashtags && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Hashtags</p>
              <p className="text-sm text-indigo-600">{hashtags}</p>
            </div>
          )}
          {content.cta && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">
                Call to Action
              </p>
              <p className="text-sm text-indigo-800 font-medium">{content.cta}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100">
        <button onClick={handleCopy} className="btn-secondary text-sm">
          {copied ? "Copied!" : "Copy Content"}
        </button>
      </div>
    </div>
  );
}
