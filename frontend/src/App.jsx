import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Notes from "./pages/Notes";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Planner from "./pages/Planner";

export default function App() {
  const [stats, setStats] = useState(() => JSON.parse(localStorage.getItem("studyStats") || '{"sessions":0,"quizBest":0,"cards":0}'));
  useEffect(() => localStorage.setItem("studyStats", JSON.stringify(stats)), [stats]);
  return <Layout stats={stats} setStats={setStats}><Routes>
    <Route path="/" element={<Dashboard stats={stats} />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="/quiz" element={<Quiz setStats={setStats} />} />
    <Route path="/flashcards" element={<Flashcards setStats={setStats} />} />
    <Route path="/planner" element={<Planner />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Layout>;
}
