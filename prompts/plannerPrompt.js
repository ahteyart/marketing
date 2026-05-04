export function buildPlannerPrompt({ product, audience, painPoints, features, promotion, goal, type, platform, mode }) {
  const dayCount =
    mode === "planner_monthly" ? 30 : mode === "planner_daily" ? 7 : 1;

  return `You are an expert social media content strategist.

Create a ${dayCount}-day content calendar for the following business:

Product/Service: ${product}
Target Audience: ${audience}
Pain Points: ${painPoints || "Not specified"}
Key Features: ${features || "Not specified"}
Current Promotion: ${promotion || "None"}
Primary Goal: ${goal}
Content Style: ${type}
Platform: ${platform}

Generate exactly ${dayCount} content plan items. Return ONLY valid JSON with no extra text:

{
  "product": "${product}",
  "platform": "${platform}",
  "plan": [
    {
      "day": 1,
      "type": "education",
      "goal": "engagement",
      "angle": "The specific creative hook or angle for this post",
      "summary": "Brief 1-sentence description of what this post covers"
    }
  ]
}

Strategy rules:
- Vary content types naturally (education vs promotion ratio ~70:30)
- Mix engagement and conversion goals across the calendar
- Each angle must be unique, specific, and compelling
- Angles should feel platform-native for ${platform}
- Weave in the promotion offer on promotion days
- Build a narrative arc across days where possible
- Day 1 should hook the audience strongly`;
}
