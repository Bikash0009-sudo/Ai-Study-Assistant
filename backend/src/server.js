import express from "express";
import cors from "cors";
import { askAI, parseJSON } from "./ai.js";

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "AI Study Assistant" }));

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: "Message is required." });

    const safeHistory = Array.isArray(history)
      ? history.slice(-12).map((m) => `${m.role}: ${String(m.content).slice(0, 5000)}`).join("\n")
      : "";

    const answer = await askAI(
      "You are StudyMate, a patient AI tutor. Explain concepts clearly for a college student. Use headings, bullets and examples when useful. Do not invent facts. If the question is ambiguous, state your assumption.",
      `Previous conversation:\n${safeHistory}\n\nStudent's new question:\n${message}`
    );
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "AI request failed." });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { topic, level = "college", length = "medium" } = req.body;
    if (!topic?.trim()) return res.status(400).json({ error: "Topic is required." });
    const answer = await askAI(
      "You create exam-friendly study notes. Return ONLY valid JSON with keys: title, overview, keyPoints (array of strings), concepts (array of objects with term and explanation), examples (array of strings), examTips (array of strings).",
      `Create ${length} notes on "${topic}" for a ${level} student. Make them accurate and easy to revise.`
    );
    res.json(parseJSON(answer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Notes generation failed." });
  }
});

app.post("/api/quiz", async (req, res) => {
  try {
    const { topic, count = 5, difficulty = "medium" } = req.body;
    if (!topic?.trim()) return res.status(400).json({ error: "Topic is required." });
    const n = Math.min(Math.max(Number(count) || 5, 3), 15);
    const answer = await askAI(
      "You create high-quality educational MCQs. Return ONLY valid JSON in the shape {title:string, questions:[{question:string, options:[string,string,string,string], answer:number, explanation:string}]}. answer is the zero-based index of the correct option.",
      `Create ${n} ${difficulty} difficulty multiple-choice questions about "${topic}". Avoid trick wording. Include concise explanations.`
    );
    res.json(parseJSON(answer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Quiz generation failed." });
  }
});

app.post("/api/flashcards", async (req, res) => {
  try {
    const { topic, count = 8 } = req.body;
    if (!topic?.trim()) return res.status(400).json({ error: "Topic is required." });
    const n = Math.min(Math.max(Number(count) || 8, 4), 20);
    const answer = await askAI(
      "You create concise study flashcards. Return ONLY valid JSON in the shape {title:string, cards:[{front:string,back:string}]}.",
      `Create ${n} useful flashcards for "${topic}". Front should be a question or term; back should be a concise answer.`
    );
    res.json(parseJSON(answer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Flashcard generation failed." });
  }
});

app.post("/api/plan", async (req, res) => {
  try {
    const { subjects, examDate, hoursPerDay = 2 } = req.body;
    if (!subjects?.trim() || !examDate) return res.status(400).json({ error: "Subjects and exam date are required." });
    const answer = await askAI(
      "You create realistic study plans. Return ONLY valid JSON in the shape {summary:string, days:[{date:string, focus:string, tasks:[string], hours:number}], tips:[string]}. Do not schedule dates after the exam date.",
      `Create a study plan for these subjects: ${subjects}. Exam date: ${examDate}. Available study time: ${hoursPerDay} hours/day. Prioritize difficult subjects and include revision.`
    );
    res.json(parseJSON(answer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Study plan generation failed." });
  }
});

app.use((err, _req, res, _next) => res.status(500).json({ error: err.message || "Server error" }));
app.listen(port, () => console.log(`AI Study Assistant API running on http://localhost:${port}`));
