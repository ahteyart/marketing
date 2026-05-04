export function buildPostPrompt(input, planItem, mode) {
  const { product, audience, painPoints, features, promotion, platform } = input;
  const isCarousel = mode === "carousel";

  const outputSchema = isCarousel
    ? `{
  "english": {
    "slides": [
      { "headline": "Slide headline (short, punchy)", "body": "Slide supporting copy (1-2 sentences)" }
    ],
    "caption": "Post caption to accompany carousel",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "cta": "Call to action text"
  },
  "malay": {
    "slides": [
      { "headline": "Tajuk slaid", "body": "Isi slaid" }
    ],
    "caption": "Kapsyen post",
    "hashtags": ["#hashtag1", "#hashtag2"],
    "cta": "Teks ajakan bertindak"
  },
  "chinese": {
    "slides": [
      { "headline": "幻灯片标题", "body": "幻灯片正文" }
    ],
    "caption": "帖子说明文字",
    "hashtags": ["#hashtag1", "#hashtag2"],
    "cta": "号召性用语"
  }
}`
    : `{
  "english": {
    "caption": "Full engaging post caption with hook, value, and story",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
    "cta": "Clear and specific call to action"
  },
  "malay": {
    "caption": "Kapsyen post penuh yang menarik dengan hook dan nilai",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "cta": "Ajakan bertindak yang jelas"
  },
  "chinese": {
    "caption": "完整的帖子说明，包含钩子、价值和故事",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "cta": "清晰具体的号召性用语"
  }
}`;

  return `You are an expert multilingual social media copywriter specializing in ${platform} content.

Write ${isCarousel ? "a 5-7 slide carousel post" : "a single post"} for Day ${planItem.day} of a content calendar.

Business context:
- Product: ${product}
- Audience: ${audience}
- Pain Points: ${painPoints || "Not specified"}
- Features: ${features || "Not specified"}
- Promotion: ${promotion || "None"}
- Platform: ${platform}

Today's content brief:
- Type: ${planItem.type}
- Goal: ${planItem.goal}
- Angle: ${planItem.angle}
- Summary: ${planItem.summary}

Write in all three languages. Return ONLY valid JSON:

${outputSchema}

Language guidelines:
- English: Professional yet conversational. Hook in first line. Platform-optimized length.
- Malay: Natural Malaysian tone. Mix Bahasa Melayu with occasional English terms as locals do. Warm and relatable.
- Chinese: Simplified Chinese. Concise and direct. Culturally resonant, not a word-for-word translation.
- Hashtags: Use a mix of English and local-language hashtags per market.
- Goal alignment: Content must drive ${planItem.goal} for a ${platform} audience.`;
}
