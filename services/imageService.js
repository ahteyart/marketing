export async function generateImage(prompt) {
  const negativePrompt =
    "text, words, letters, typography, watermark, writing, captions, titles, labels, signs, fonts, alphabet, numbers, logo, ugly, deformed, blurry, low quality, bad anatomy";

  // ✅ Using black-forest-labs/FLUX.1-schnell - confirmed working with hf-inference
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Image generation failed: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return { base64, mimeType: "image/jpeg" };
}
