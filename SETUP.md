# Setup Guide

This guide will help you get the Triple-Reasoning Chat Analyzer up and running.

## Prerequisites

Before you begin, make sure you have:

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **OpenRouter API Key** - [Get one here](https://openrouter.ai/)
4. **Docker & Docker Compose** (optional, for containerized deployment)

## Quick Start (Development)

### 1. Set up environment variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your OpenRouter API key
# OPENROUTER_API_KEY=your_actual_api_key_here
# OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free (default, free model)
```

**Note:** The default model is Llama 3.3 70B Instruct (free). You can change this to any OpenRouter model like `anthropic/claude-opus-4.5` or `anthropic/claude-sonnet-4.5`. See [OpenRouter Models](https://openrouter.ai/models) for options.

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Run the application

**Option A: Run both servers manually**

Open two terminal windows:

```bash
# Terminal 1 - Backend (from backend directory)
cd backend
npm run dev

# Terminal 2 - Frontend (from frontend directory)
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**Option B: Use the provided scripts**

From the root directory:

```bash
# Install all dependencies
npm run install:all

# Run both servers
npm run dev
```

## Docker Deployment

### 1. Set up environment variables

```bash
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY
```

### 2. Build and run with Docker Compose

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# Stop containers
docker-compose down
```

Access the application at http://localhost:3000

## Verifying the Setup

### Check Backend Health

```bash
curl http://localhost:5000/health
```

You should see:
```json
{"status":"ok","timestamp":"..."}
```

### Check Frontend

Open http://localhost:3000 in your browser. You should see the chat interface.

## Testing the Application

1. **Send a test message**: Try asking "Should we regulate AI?"
2. **Wait for responses**: You'll receive three different reasoning-based responses
3. **Analyze logic**: Click "Analyze Logic" on any response to see detailed logical analysis

## Common Issues

### Backend won't start
- Make sure you've set `OPENROUTER_API_KEY` in your `.env` file
- Check that port 5000 is not already in use
- Verify Node.js version: `node --version` (should be 18+)

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend/.env (should be `http://localhost:5000`)
- Check browser console for CORS errors

### Docker issues
- Make sure Docker Desktop is running
- Check Docker version: `docker --version`
- Try rebuilding: `docker-compose up --build --force-recreate`

## Project Structure

```
├── backend/              # Express + TypeScript API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── types/       # TypeScript types
│   └── package.json
│
├── frontend/            # React + TypeScript UI
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   └── types/       # TypeScript types
│   └── package.json
│
└── docker-compose.yml   # Container orchestration
```

## Next Steps

- Explore different types of questions
- Test the logic analysis feature
- Customize the prompts in `backend/src/services/promptBuilder.ts`
- Adjust the UI styling in frontend components

## Need Help?

- Check the main [README.md](README.md) for API documentation
- Review example questions in the chat interface
- Inspect browser console for frontend errors
- Check backend logs for API errors
