import parseCSV from "../utils/csvParser.js";

let leads = []; // in-memory

const uploadLeads = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  try {
    leads = await parseCSV(req.file.buffer);
    return res.json({
      message: "Leads uploaded successfully",
      count: leads.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to parse CSV" });
  }
};

const getLeads = () => leads;

export { getLeads, uploadLeads };
