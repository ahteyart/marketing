"use client";

import { useState } from "react";
import Form from "@/components/Form";
import Result from "@/components/Result";
import PlannerView from "@/components/PlannerView";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("single");

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError("");
    setResult(null);
    setMode(formData.mode);

    try {
      const res = await fetch("/api/generate-chain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPlanner = mode === "planner_daily" || mode === "planner_monthly";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-indigo-600">ContentAI</span>
            <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              Beta
            </span>
          </div>
          <p className="text-sm text-gray-500 hidden sm:block">
            AI-powered social media content in 3 languages
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Generator</h1>
          <p className="text-gray-500 mt-1">
            Fill in your business details and generate ready-to-post content in English, Malay, and Chinese
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <Form onGenerate={handleGenerate} loading={loading} />
          </div>

          <div className="xl:col-span-3 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="card flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-700 font-medium">Generating your content...</p>
                <p className="text-gray-400 text-sm mt-1">
                  {isPlanner
                    ? "Building your content plan — this may take up to a minute"
                    : "This will only take a moment"}
                </p>
              </div>
            )}

            {result && !loading && (
              isPlanner ? <PlannerView data={result} /> : <Result data={result} />
            )}

            {!result && !loading && !error && (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-gray-700 font-medium text-lg">Your content will appear here</p>
                <p className="text-gray-400 text-sm mt-1">Fill in the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
