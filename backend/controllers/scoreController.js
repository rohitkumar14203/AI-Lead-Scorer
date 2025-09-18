import { getLeads } from "./leadController.js";
import { getOffer } from "./offerController.js";
import applyRules from "../services/rulesService.js";
import getAIScore from "../services/aiService.js";

let scoredResults = []; // in-memory storage

const scoreLeads = async (req, res) => {
  const leads = getLeads();
  const offer = getOffer();

  if (!offer || Object.keys(offer).length === 0) {
    return res.status(400).json({ error: "Please create an offer first" });
  }

  if (!leads || leads.length === 0) {
    return res.status(400).json({ error: "No leads uploaded" });
  }

  scoredResults = []; // reset previous results

  for (const lead of leads) {
    // 1️⃣ Rules scoring (max 50)
    const rulesScore = applyRules(lead, offer);

    // 2️⃣ AI scoring (max 50)
    const {
      intent,
      reasoning,
      score: aiRawScore,
    } = await getAIScore(lead, offer);

    // Map AI intent to score (assignment: High=50, Medium=30, Low=10)
    let aiScore = 0;
    if (intent === "High") aiScore = 50;
    else if (intent === "Medium") aiScore = 30;
    else aiScore = 10;

    // Final Score (rules + AI)
    const finalScore = Math.min(rulesScore + aiScore, 100);

    scoredResults.push({
      ...lead,
      intent,
      reasoning,
      score: finalScore,
    });
  }

  return res.json({
    message: "Leads scored successfully",
    results: scoredResults,
  });
};

const getResults = (req, res) => {
  res.json(scoredResults);
};

export { scoreLeads, getResults };
