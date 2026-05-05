"use client";

import { useState } from "react";

export default function ImageGallery({ product, type, angle, summary }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buildPrompt = () => {
    const context = [angle, summary].filter(Boolean).join(", ");
    return `Professional lifestyle photography, ${context}, ${product}, clean modern aesthetic, soft natural lighting, high quality commercial photography, 4k, photorealistic`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate image.");
      } else {
        setImages((prev) => [data, ...prev]);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">AI-Generated Images</h3>
        <button onClick={handleGenerate} disabled={loading} className="btn-primary text-sm">
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {images.length === 0 && !loading && (
        <p className="text-sm text-gray-400 text-center py-8">
          Click &quot;Generate Image&quot; to create a visual for this post
        </p>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Generating with FLUX...</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => {
          const src = `data:${img.mimeType};base64,${img.base64}`;
          return (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Generated ${i + 1}`} className="w-full h-full object-cover" />
              <a
                href={src}
                download={`contentai-image-${i + 1}.jpg`}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-end p-3 opacity-0 group-hover:opacity-100"
              >
                <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
                  Download
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
