export interface Message {
  id: string;
  type: 'user' | 'triple-bot';
  content: string | TripleBotResponse;
  timestamp: Date;
}

export interface TripleBotResponse {
  deductive: BotResponse;
  inductive: BotResponse;
  abductive: BotResponse;
}

export interface BotResponse {
  text: string;
  quickAnalysis: {
    validity?: 'valid' | 'invalid';
    strength?: 'weak' | 'moderate' | 'strong';
    plausibility?: number;
  };
}

export interface LogicAnalysis {
  symbolicForm: string;
  premises: string[];
  conclusion: string;
  argumentForm: string;
  isValid: boolean;
  isSound: boolean | null;
  fallacies: Fallacy[];
  explanation: string;
}

export interface Fallacy {
  name: string;
  type: 'Formal' | 'Informal';
  symbolicForm?: string;
  location: string;
  explanation: string;
  correction: string;
}

export type ReasoningType = 'deductive' | 'inductive' | 'abductive';
