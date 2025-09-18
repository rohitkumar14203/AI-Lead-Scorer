import express from "express";

import { scoreLeads, getResults } from "../controllers/scoreController.js";

const router = express.Router();

// Score all uploaded leads
router.post("/", scoreLeads);

// Get all scored results
router.get("/results", getResults);

export default router;
