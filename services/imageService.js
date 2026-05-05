export async function generateImage(prompt) {
  const negativePrompt =
    "text, words, letters, typography, watermark, writing, captions, titles, labels, signs, fonts, alphabet, numbers, logo, ugly, deformed, blurry, low quality, bad anatomy";

  // ✅ New correct URL format for Hugging Face Inference API
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: negativePrompt,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          width: 1024,
          height: 1024,
        },
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
