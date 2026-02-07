import express, { Request, Response } from 'express';
import { OpenRouterService } from '../services/openrouter';
import { PromptBuilder } from '../services/promptBuilder';
import { LogicAnalyzer } from '../services/logicAnalyzer';
import { ChatRequest, AnalyzeLogicRequest, TripleBotResponse } from '../types/chat';

const router = express.Router();

// Initialize services
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  throw new Error('OPENROUTER_API_KEY environment variable is required');
}

const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

const openRouterService = new OpenRouterService(apiKey, model);
const logicAnalyzer = new LogicAnalyzer(openRouterService);

// POST /api/chat/triple-reasoning
router.post('/triple-reasoning', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body as ChatRequest;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Build prompt for triple reasoning
    const messages = PromptBuilder.buildTripleReasoningPrompt(message);

    // Generate triple response
    const response = await openRouterService.generateJSONCompletion<TripleBotResponse>(
      messages,
      0.7
    );

    res.json(response);
  } catch (error: any) {
    console.error('Triple reasoning error:', error);
    res.status(500).json({
      error: 'Failed to generate triple reasoning response',
      details: error.message
    });
  }
});

// POST /api/chat/analyze-logic
router.post('/analyze-logic', async (req: Request, res: Response) => {
  try {
    const { text, reasoningType } = req.body as AnalyzeLogicRequest;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (!reasoningType || !['deductive', 'inductive', 'abductive'].includes(reasoningType)) {
      return res.status(400).json({
        error: 'Reasoning type is required and must be deductive, inductive, or abductive'
      });
    }

    // Perform logic analysis
    const analysis = await logicAnalyzer.analyzeLogic(text, reasoningType);

    res.json(analysis);
  } catch (error: any) {
    console.error('Logic analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze logic',
      details: error.message
    });
  }
});

export default router;
