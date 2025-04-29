import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import router from "./router/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from public/
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(cors());
app.use(express.json());
app.use("/", router);
//handel not found pages
app.use((req, res, next) => {
  res.status(404).json({ error: "Page Not Found 404" });
});
//handel server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use(express.static(path.join(__dirname, "../public")));

app.disable("x-powered-by");

// app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));

export default app;
