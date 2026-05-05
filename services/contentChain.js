import { callClaude } from "@/lib/claude";
import { buildPlannerPrompt } from "@/prompts/plannerPrompt";
import { buildPostPrompt } from "@/prompts/postPrompt";

const CONCURRENCY = 5;

async function processInChunks(items, fn, chunkSize = CONCURRENCY) {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
  }
  return results;
}

export async function generateContentChain(input) {
  // ✅ Safe defaults so nothing is undefined
  const safeInput = {
    ...input,
    painPoints: input.painPoints || "Not specified",
    features: input.features || "Not specified",
    promotion: input.promotion || "Not specified",
    goal: input.goal || "Not specified",
  };

  const plannerPrompt = buildPlannerPrompt(safeInput);
  const plannerRaw = await callClaude(plannerPrompt, "gemini-2.5-pro");

  let plannerData;
  try {
    plannerData = JSON.parse(plannerRaw);
  } catch {
    throw new Error("Failed to parse content plan. The AI returned an unexpected format.");
  }

  const plan = plannerData.plan || [];
  if (plan.length === 0) throw new Error("Content plan is empty.");

  const posts = await processInChunks(plan, async (item) => {
    const postPrompt = buildPostPrompt(safeInput, item, safeInput.mode);
    const postRaw = await callClaude(postPrompt, "gemini-2.5-pro");

    let content;
    try {
      content = JSON.parse(postRaw);
    } catch {
      content = {
        english: { caption: postRaw, hashtags: [], cta: "" },
        malay: { caption: "", hashtags: [], cta: "" },
        chinese: { caption: "", hashtags: [], cta: "" },
      };
    }

    return { ...item, content };
  });

  return { planner: plannerData, posts };
}
