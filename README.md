<<<<<<< HEAD
# EaseGov

EaseGov is a minimal fullstack app that helps users understand government processes with AI. It includes an AI chat assistant, a document simplifier, and a step-by-step guide generator.

## Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Python Flask
- AI: OpenAI Python client using the Responses API

## Project Structure

```text
easegov/
├── frontend/
│   ├── src/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   └── requirements.txt
├── .env.example
└── README.md
```

## Environment Setup

Create a `.env` file in the `easegov/` folder:

```bash
cp .env.example .env
```

Then set your OpenAI API key:

```env
OPENAI_API_KEY=your_real_api_key
OPENAI_MODEL=gpt-5.4-mini
PORT=5000
CORS_ORIGINS=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000
```

## Run Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend runs at `http://localhost:5000`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API Endpoints

### POST `/ask`

Input:

```json
{ "query": "How to apply for passport in India" }
```

Output:

```json
{ "title": "AI Chat Assistant", "response": "..." }
```

### POST `/simplify`

Input:

```json
{ "text": "Long government document text..." }
```

Output:

```json
{ "title": "Document Simplifier", "response": "..." }
```

### POST `/steps`

Input:

```json
{ "process": "Apply for a passport in India" }
```

Output:

```json
{ "title": "Step-by-Step Guide", "response": "..." }
```

## Notes

- Keep your API key private and never commit `.env`.
- `OPENAI_MODEL` is configurable, so you can switch models without changing code.
- AI responses are general guidance. Users should verify official requirements, fees, and appointment rules on the relevant government website.
=======
## 👨‍💻 Team Details
- Team Name: Code Paradox 
- Member 1: apras kushwah  
- Member 2: hityesha choudhary
- Member 3: deepak mangal
- Member 4: rishika farkya
---
Team code : UDB-HSBJ
>>>>>>> e80bc06683a38e22872accc2b8c40eeba865b76f
