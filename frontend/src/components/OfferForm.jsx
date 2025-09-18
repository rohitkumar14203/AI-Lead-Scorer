import { useState } from "react";
import { postOffer } from "../services/api";

function OfferForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [valueProps, setValueProps] = useState("");
  const [useCases, setUseCases] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const offer = {
        name,
        value_props: valueProps.split(",").map((v) => v.trim()),
        ideal_use_cases: useCases.split(",").map((u) => u.trim()),
      };
      const res = await postOffer(offer);
      onSuccess(res);
      setSaved(true);
      setName("");
      setValueProps("");
      setUseCases("");
    } catch (err) {
      console.error("❌ Offer save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl py-10 px-4 space-y-8 max-w-4xl"
    >
      <h2 className="text-xl font-bold text-indigo-700 mb-2">Offer Form</h2>

      <input
        type="text"
        placeholder="Product/Offer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <input
        type="text"
        placeholder="Value Props (comma separated)"
        value={valueProps}
        onChange={(e) => setValueProps(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <input
        type="text"
        placeholder="Ideal Use Cases (comma separated)"
        value={useCases}
        onChange={(e) => setUseCases(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <button
        type="submit"
        disabled={saving}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400`}
      >
        {saving ? "Saving..." : "Save Offer"}
      </button>
      {saved && (
        <div className="text-green-600 font-semibold mt-2 animate-fade-in">
          Offer Saved!
        </div>
      )}
    </form>
  );
}

export default OfferForm;
