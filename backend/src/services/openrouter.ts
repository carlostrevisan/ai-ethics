import axios from 'axios';
import { ConversationMessage } from '../types/chat';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class OpenRouterService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateCompletion(
    messages: ConversationMessage[],
    temperature: number = 0.7
  ): Promise<string> {
    try {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: this.model,
          messages: messages,
          temperature: temperature,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Triple-Reasoning Chat Analyzer',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('OpenRouter API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateJSONCompletion<T>(
    messages: ConversationMessage[],
    temperature: number = 0.7
  ): Promise<T> {
    const completion = await this.generateCompletion(messages, temperature);

    try {
      // Extract JSON from markdown code blocks if present (with or without 'json' keyword)
      const jsonMatch = completion.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : completion;

      return JSON.parse(jsonString.trim());
    } catch (error) {
      console.error('Failed to parse JSON response:', completion);
      throw new Error('Invalid JSON response from AI');
    }
  }
}
