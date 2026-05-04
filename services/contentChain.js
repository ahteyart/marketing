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
  // Step 1: Generate the content plan using the more capable model
  const plannerPrompt = buildPlannerPrompt(input);
  const plannerRaw = await callClaude(plannerPrompt, "claude-opus-4-7");

  let plannerData;
  try {
    plannerData = JSON.parse(plannerRaw);
  } catch {
    throw new Error("Failed to parse content plan. The AI returned an unexpected format.");
  }

  const plan = plannerData.plan || [];
  if (plan.length === 0) {
    throw new Error("Content plan is empty.");
  }

  // Step 2: Generate individual posts for each plan item in parallel chunks
  const posts = await processInChunks(plan, async (item) => {
    const postPrompt = buildPostPrompt(input, item, input.mode);
    const postRaw = await callClaude(postPrompt, "claude-sonnet-4-6");

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
