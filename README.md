# Triple-Reasoning Chat Analyzer

An educational chat application that simulates three simultaneous AI responses using different reasoning types (pseudo-deductive, pseudo-inductive, and pseudo-abductive), with built-in logical analysis and fallacy detection.

**Author:** Carlos Trevisan

## ⚠️ Educational Simulation Notice

This is a **pseudo-reasoning simulation**. Large Language Models (LLMs) are fundamentally statistical pattern matchers and next-token predictors - they don't truly "reason" in the classical sense. This tool uses carefully crafted prompts to force the LLM to simulate different reasoning patterns for educational purposes.

## Features

- **Triple-Reasoning Responses**: Every question gets 3 answers, each simulating a distinct reasoning approach via prompt engineering
  - Pseudo-Deductive: General principles → Specific conclusions
  - Pseudo-Inductive: Specific examples → General patterns
  - Pseudo-Abductive: Observations → Best explanations

- **Deep Logic Analysis**: Click any response to see:
  - Symbolic logical notation
  - Argument structure breakdown
  - Validity/soundness assessment
  - Fallacy detection with corrections

- **Multi-turn Conversations**: Maintain context across conversation history

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **AI**: OpenRouter API (Default: Llama 3.3 70B - Free, configurable to any OpenRouter model)
- **Deployment**: Docker + Docker Compose

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for deployment)
- OpenRouter API key ([get one here](https://openrouter.ai/))

### Setup

1. **Clone and configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your OPENROUTER_API_KEY
   # Optionally change OPENROUTER_MODEL (default: meta-llama/llama-3.3-70b-instruct:free)
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Run development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic (AI, prompts, analysis)
│   │   ├── types/           # TypeScript interfaces
│   │   └── server.ts        # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Main page components
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API client
│   │   └── types/           # TypeScript interfaces
│   └── package.json
│
├── docker-compose.yml
└── .env
```

## API Endpoints

### POST /api/chat/triple-reasoning
Generate three reasoning-based responses for a user message.

**Request:**
```json
{
  "message": "Should we regulate AI?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "deductive": { "text": "...", "quickAnalysis": {...} },
  "inductive": { "text": "...", "quickAnalysis": {...} },
  "abductive": { "text": "...", "quickAnalysis": {...} }
}
```

### POST /api/chat/analyze-logic
Perform deep logical analysis on a response.

**Request:**
```json
{
  "text": "All humans are mortal. Socrates is human. Therefore, Socrates is mortal.",
  "reasoningType": "deductive"
}
```

**Response:**
```json
{
  "symbolicForm": "P → Q, P, ∴ Q",
  "premises": ["All humans are mortal", "Socrates is human"],
  "conclusion": "Socrates is mortal",
  "argumentForm": "Modus Ponens",
  "isValid": true,
  "fallacies": []
}
```

## Configuration

### Changing the AI Model

By default, the application uses `meta-llama/llama-3.3-70b-instruct:free` (a free model). You can change this by setting the `OPENROUTER_MODEL` environment variable in your `.env` file:

```bash
OPENROUTER_MODEL=anthropic/claude-opus-4.5
# or
OPENROUTER_MODEL=anthropic/claude-sonnet-4.5
# or any other model from OpenRouter
```

See available models at [OpenRouter Models](https://openrouter.ai/models)

## Development Phases

- [x] Phase 1: Project scaffolding and basic structure
- [x] Phase 2: AI integration and triple-reasoning prompts
- [x] Phase 3: Logic analysis and fallacy detection
- [x] Phase 4: Polish, testing, and deployment

## Author

Created by **Carlos Trevisan**

## License

MIT
