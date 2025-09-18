import OfferForm from "./components/OfferForm";
import CSVUpload from "./components/CSVUpload";
import ScoreButton from "./components/ScoreButton";
import ResultsTable from "./components/ResultTable";
import { useState } from "react";
const App = () => {
  const [offer, setOffer] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [scoringTriggered, setScoringTriggered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto py-10 px-4 space-y-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow">
          Lead Scoring Dashboard
        </h1>

        {/* 1. Offer Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <OfferForm onSuccess={setOffer} />
        </div>

        {/* 2. CSV Upload */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <CSVUpload onSuccess={setCsvFile} />
        </div>

        {/* 3. Run Scoring */}
        <div className="flex justify-center">
          <ScoreButton
            offer={offer}
            csvFile={csvFile}
            onScoringComplete={() => setScoringTriggered((prev) => !prev)}
          />
        </div>

        {/* 4. Results Table */}
        <ResultsTable scoringTriggered={scoringTriggered} />
      </div>
    </div>
  );
};

export default App;
