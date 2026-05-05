"use client";

import { useState } from "react";

export default function ImageGallery({ content, product, type }) {
  const [images, setImages] = useState([]);

  const buildPrompt = () => {
    const style =
      type === "carousel" ? "carousel visual" : "social media advertisement";
    return `Professional ${style} for ${product}. Clean modern design, vibrant colors, high quality commercial photography, minimalist layout. No text, no words, no letters, no typography, no writing, no characters, no captions.`;
  };

  const handleGenerate = () => {
    const prompt = encodeURIComponent(buildPrompt());
    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true&model=flux&seed=${seed}`;
    setImages((prev) => [{ url, seed, loaded: false, error: false }, ...prev]);
  };

  const updateImage = (seed, updates) =>
    setImages((prev) =>
      prev.map((img) => (img.seed === seed ? { ...img, ...updates } : img))
    );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">AI-Generated Images</h3>
        <button onClick={handleGenerate} className="btn-primary text-sm">
          Generate Image
        </button>
      </div>

      {images.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">
          Click &quot;Generate Image&quot; to create a visual for this post
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <div
            key={img.seed}
            className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
          >
            {!img.loaded && !img.error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-xs text-gray-400">Generating...</p>
              </div>
            )}

            {img.error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs text-red-500 text-center px-4">
                  Failed to load. Try again.
                </p>
              </div>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={`Generated ${i + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                img.loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => updateImage(img.seed, { loaded: true })}
              onError={() => updateImage(img.seed, { error: true })}
            />

            {img.loaded && (
              <a
                href={img.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-end p-3 opacity-0 group-hover:opacity-100"
              >
                <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
                  Download
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
