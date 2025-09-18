import { useEffect, useState } from "react";
import { getResults } from "../services/api";

const intentColors = {
  High: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-red-100 text-red-800",
};

function ResultsTable({ scoringTriggered }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await getResults();
        setResults(data || []);
        setExpandedRows({}); // Reset expanded state on new results
      } catch (err) {
        console.error("❌ Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [scoringTriggered]);

  if (loading) {
    return <p className="text-gray-600">Loading results...</p>;
  }

  if (!results.length) {
    return (
      <p className="text-gray-500">No results available. Run scoring first.</p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Role</th>
            <th className="px-4 py-2 border-b text-left">Company</th>
            <th className="px-4 py-2 border-b text-left">Industry</th>
            <th className="px-4 py-2 border-b text-center">Intent</th>
            <th className="px-4 py-2 border-b text-center">Score</th>
            <th className="px-4 py-2 border-b text-left">Reasoning</th>
          </tr>
        </thead>
        <tbody>
          {results.map((lead, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{lead.name}</td>
              <td className="px-4 py-2 border-b">{lead.role}</td>
              <td className="px-4 py-2 border-b">{lead.company}</td>
              <td className="px-4 py-2 border-b">{lead.industry}</td>
              <td className="px-4 py-2 border-b text-center">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    intentColors[lead.intent] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {lead.intent}
                </span>
              </td>
              <td className="px-4 py-2 border-b text-center font-semibold">
                {lead.score}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {typeof lead.reasoning === "string" ? (
                  <>
                    {expandedRows[idx]
                      ? lead.reasoning
                      : lead.reasoning.slice(0, 100) +
                        (lead.reasoning.length > 100 ? "..." : "")}
                    {lead.reasoning.length > 100 && (
                      <button
                        className="ml-2 text-indigo-600 underline text-xs"
                        onClick={() =>
                          setExpandedRows((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      >
                        {expandedRows[idx] ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
