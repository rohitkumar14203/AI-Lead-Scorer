import express from "express";
import multer from "multer";
import { uploadLeads } from "../controllers/leadController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadLeads);

export default router;
