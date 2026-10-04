# AI Study Assistant

Full-stack study assistant built with React, JavaScript, Motion, Node.js, Express and the OpenAI Responses API.

## Requirements
- Node.js 20+
- An OpenAI API key

## Run

### Backend
```bash
cd backend
npm install
cp .env.example .env
# put your API key in .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally http://localhost:5173).

The frontend calls the Express API at `http://localhost:5000/api`.

## Features
- AI tutor chat
- AI notes generator
- AI MCQ quiz generator
- AI flashcards
- AI study planner
- Motion animations
- Local progress/history persistence
