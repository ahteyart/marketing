import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function callClaude(prompt, model = "gemini-2.5-pro") {
  const gemini = genAI.getGenerativeModel({ model });
  const result = await gemini.generateContent(prompt);
  const raw = result.response.text();
  return extractJson(raw);
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();

  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) return jsonMatch[0];

  return text.trim();
}
