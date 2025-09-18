import { useState } from "react";
import { runScoring } from "../services/api";

export default function ScoreButton({ onScoringComplete }) {
  const [loading, setLoading] = useState(false);
  const [scored, setScored] = useState(false);

  const handleScore = async () => {
    setLoading(true);
    setScored(false);
    try {
      await runScoring();
      setScored(true);
      if (onScoringComplete) {
        onScoringComplete();
      }
    } catch (err) {
      console.error("Error while scoring:", err);
      alert("Scoring failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleScore}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Scoring..." : "Run Scoring"}
      </button>
      {scored && (
        <div className="text-indigo-600 font-semibold mt-2 animate-fade-in">
          Scoring Complete!
        </div>
      )}
    </div>
  );
}
