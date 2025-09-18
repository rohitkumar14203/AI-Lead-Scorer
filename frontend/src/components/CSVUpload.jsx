import { useState, useRef } from "react";
import { uploadLeads } from "../services/api";

function CSVUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file");
    setLoading(true);
    setUploaded(false);
    try {
      const res = await uploadLeads(file);
      onSuccess(res);
      setUploaded(true);
      setFile(null);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl py-10 px-4 space-y-8 max-w-4xl">
      <h2 className="text-xl font-bold text-green-700 mb-2">
        Upload Leads (CSV)
      </h2>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-600
                   hover:file:bg-blue-100"
      />

      {/* Show selected file name or "No file chosen" */}
      <div className="text-sm text-gray-500 mt-1">
        {file ? file.name : "No file chosen"}
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
      {uploaded && (
        <div className="text-green-600 font-semibold mt-2 animate-fade-in">
          CSV Uploaded!
        </div>
      )}
    </div>
  );
}

export default CSVUpload;
