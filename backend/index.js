import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import offerRoutes from "./routes/offerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://ai-lead-scorer-mu.vercel.app",

    methods: ["GET", "POST"],
  })
);

app.get("/", (req, res) => {
  res.send("i am alive");
});

app.use("/offer", offerRoutes);
app.use("/leads", leadRoutes);
app.use("/score", scoreRoutes);

app.listen(port, () => {
  console.log(`sever is up✔`);
});
