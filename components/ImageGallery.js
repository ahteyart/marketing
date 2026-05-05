"use client";

import { useState } from "react";

export default function ImageGallery({ content, product, type }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const buildPrompt = () => {
    const caption = content?.caption?.slice(0, 100) || "";
    const style =
      type === "carousel"
        ? "carousel slide with bold headline"
        : "social media advertisement";
    return `Professional ${style} for ${product}. ${caption}. Clean modern design, vibrant colors, high quality commercial photography, no text overlay.`;
  };

  const handleGenerate = () => {
    setLoading(true);
    const prompt = encodeURIComponent(buildPrompt());
    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&nologo=true&model=flux&seed=${seed}`;
    setImages((prev) => [{ url, seed }, ...prev]);
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">AI-Generated Images</h3>
        <button onClick={handleGenerate} disabled={loading} className="btn-primary text-sm">
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
          <div key={img.seed} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={`Generated ${i + 1}`}
              className="w-full h-full object-cover"
              onLoad={() => {}}
            />
            <a
              href={img.url}
              download={`contentai-image-${img.seed}.png`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-end p-3 opacity-0 group-hover:opacity-100"
            >
              <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
                Download
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
