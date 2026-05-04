export async function generateImage(prompt, type = "ad") {
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    throw new Error("Image generation is not configured. Please set STABILITY_API_KEY.");
  }

  const response = await fetch(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          { text: prompt, weight: 1 },
          {
            text: "blurry, low quality, text watermark, distorted faces, amateur, ugly",
            weight: -1,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Stability AI error: ${response.status}`);
  }

  const data = await response.json();
  const base64 = data.artifacts?.[0]?.base64;

  if (!base64) {
    throw new Error("No image data returned from image generation service.");
  }

  return { base64, type };
}
