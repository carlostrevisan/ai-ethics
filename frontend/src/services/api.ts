import axios from 'axios';
import { TripleBotResponse, LogicAnalysis, Message, ReasoningType } from '../types/chat';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  async getTripleReasoning(
    message: string,
    conversationHistory: Message[] = []
  ): Promise<TripleBotResponse> {
    const response = await api.post('/api/chat/triple-reasoning', {
      message,
      conversationHistory,
    });
    return response.data;
  },

  async analyzeLogic(
    text: string,
    reasoningType: ReasoningType
  ): Promise<LogicAnalysis> {
    const response = await api.post('/api/chat/analyze-logic', {
      text,
      reasoningType,
    });
    return response.data;
  },
};
