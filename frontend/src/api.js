const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function post(path, body) {
  const res = await fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  chat: (body) => post("/chat", body),
  notes: (body) => post("/notes", body),
  quiz: (body) => post("/quiz", body),
  flashcards: (body) => post("/flashcards", body),
  plan: (body) => post("/plan", body),
};
