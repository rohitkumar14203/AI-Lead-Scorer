// backend/services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("❌ GOOGLE_GEMINI_KEY is missing in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
    You are an AI assistant that evaluates sales leads.
    Given lead info and an offer, decide the buying intent as:
    - High
    - Medium
    - Low

    Respond ONLY in JSON format:
    {
      "intent": "High | Medium | Low",
      "reasoning": "short explanation"
    }
  `,
});

const getAIScore = async (lead, offer) => {
  try {
    const prompt = `
Lead Info: ${JSON.stringify(lead, null, 2)}
Offer Info: ${JSON.stringify(offer, null, 2)}

Question: What is the buying intent? Respond in JSON only.
    `;

    const result = await model.generateContent(prompt);
    let text = result?.response?.text?.() || "";

    // 🔹 Clean code block formatting if AI adds ```json ... ```
    text = text.replace(/```json|```/gi, "").trim();

    let intent = "Low";
    let reasoning = "Not a strong match based on AI analysis.";

    try {
      const parsed = JSON.parse(text);
      intent = parsed.intent || intent;
      reasoning = parsed.reasoning || reasoning;
    } catch {
      const lower = text.toLowerCase();
      if (lower.includes("high")) intent = "High";
      else if (lower.includes("medium")) intent = "Medium";
      reasoning = text || reasoning;
    }

    return { intent, reasoning };
  } catch (error) {
    console.error("❌ Error fetching AI score:", error.message);
    return {
      intent: "Low",
      reasoning: "AI service error, defaulted to Low",
    };
  }
};

export default getAIScore;
