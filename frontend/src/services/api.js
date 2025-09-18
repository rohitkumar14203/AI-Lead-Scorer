import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL, // backend URL
});

// Save Offer
export const postOffer = async (offer) => {
  const { data } = await API.post("/offer", offer);
  return data;
};

// Upload Leads CSV
export const uploadLeads = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await API.post("/leads/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Run Scoring
export const runScoring = async () => {
  const { data } = await API.post("/score");
  return data;
};

// Get Results
export const getResults = async () => {
  const { data } = await API.get("/score/results");
  return data;
};
