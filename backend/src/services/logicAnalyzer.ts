import { OpenRouterService } from './openrouter';
import { PromptBuilder } from './promptBuilder';
import { LogicAnalysis } from '../types/chat';

export class LogicAnalyzer {
  constructor(private openRouterService: OpenRouterService) {}

  async analyzeLogic(
    text: string,
    reasoningType: 'deductive' | 'inductive' | 'abductive'
  ): Promise<LogicAnalysis> {
    const messages = PromptBuilder.buildLogicAnalysisPrompt(text, reasoningType);

    const analysis = await this.openRouterService.generateJSONCompletion<LogicAnalysis>(
      messages,
      0.3 // Lower temperature for more consistent analysis
    );

    return analysis;
  }
}
