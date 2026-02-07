import { ConversationMessage } from '../types/chat';

export class PromptBuilder {
  static buildTripleReasoningPrompt(userMessage: string): ConversationMessage[] {
    const systemPrompt = `You are three different reasoning assistants responding to the same question. You will generate THREE separate responses, each using ONLY the specified reasoning mode.

Return your response as a JSON object with this exact structure:
{
  "deductive": {
    "text": "your deductive response here",
    "quickAnalysis": {
      "validity": "valid" or "invalid"
    }
  },
  "inductive": {
    "text": "your inductive response here",
    "quickAnalysis": {
      "strength": "weak", "moderate", or "strong"
    }
  },
  "abductive": {
    "text": "your abductive response here",
    "quickAnalysis": {
      "plausibility": number between 0-100
    }
  }
}`;

    const userPrompt = `USER QUESTION: "${userMessage}"

Generate THREE separate responses:

1. DEDUCTIVE RESPONSE (syllogistic structure, general → specific):
   - Start with universal principles or established facts
   - Apply logical rules to the specific case
   - Draw necessary conclusions that MUST follow
   - Use clear logical connectors (if...then, all...are, therefore)
   - Keep to 2-4 sentences
   - Format example: "All X are Y. Z is X. Therefore, Z is Y."

2. INDUCTIVE RESPONSE (pattern recognition, specific → general):
   - Reference specific historical examples or cases (at least 2-3)
   - Identify patterns or commonalities across examples
   - Generalize cautiously using probability language (likely, probably, suggests)
   - Acknowledge the conclusion is probable, not certain
   - Keep to 2-4 sentences
   - Format example: "X happened in cases A, B, and C. This pattern suggests X probably happens in similar case D."

3. ABDUCTIVE RESPONSE (inference to best explanation, effect → cause):
   - State the observation or phenomenon clearly
   - Propose the most likely explanation for why it occurs
   - Briefly acknowledge that alternative explanations exist
   - Use explanatory language (best explains, most likely because, suggests)
   - Keep to 2-4 sentences
   - Format example: "We observe X. The best explanation for X is Y, because Y would account for all the key features we see."

Important guidelines:
- Each response must use ONLY its designated reasoning type
- Keep responses concise (2-4 sentences each)
- Make the reasoning structure clear and explicit
- Return ONLY the JSON object, no additional text`;

    return [
      { role: 'user', content: systemPrompt + '\n\n' + userPrompt }
    ];
  }

  static buildLogicAnalysisPrompt(
    text: string,
    reasoningType: 'deductive' | 'inductive' | 'abductive'
  ): ConversationMessage[] {
    const systemPrompt = `You are an expert in formal logic and critical thinking. Analyze arguments for their logical structure, validity, and potential fallacies.

Return your analysis as a JSON object with this exact structure:
{
  "symbolicForm": "symbolic notation of the argument",
  "premises": ["premise 1", "premise 2", ...],
  "conclusion": "the conclusion",
  "argumentForm": "name of the logical form (e.g., Modus Ponens, Hypothetical Syllogism, etc.)",
  "isValid": true or false,
  "isSound": true or false or null,
  "fallacies": [
    {
      "name": "fallacy name",
      "type": "Formal" or "Informal",
      "symbolicForm": "P→Q, Q, ∴P (if applicable)",
      "location": "which premise or part of argument",
      "explanation": "why this is a fallacy",
      "correction": "how to fix it"
    }
  ],
  "explanation": "overall explanation of the argument's logic"
}`;

    let specificInstructions = '';

    if (reasoningType === 'deductive') {
      specificInstructions = `This is a DEDUCTIVE argument. Analyze it for:
- Symbolic form using P, Q, R with operators: → (implies), ∧ (and), ∨ (or), ¬ (not), ∴ (therefore)
- Validity: Does the conclusion necessarily follow from premises?
- Common deductive forms: Modus Ponens, Modus Tollens, Hypothetical Syllogism, Disjunctive Syllogism
- Common deductive fallacies:
  * Affirming the Consequent (P→Q, Q, ∴P)
  * Denying the Antecedent (P→Q, ¬P, ∴¬Q)
  * Invalid Hypothetical Syllogism
  * Undistributed Middle Term
  * Illicit Major/Minor`;
    } else if (reasoningType === 'inductive') {
      specificInstructions = `This is an INDUCTIVE argument. Analyze it for:
- Pattern of reasoning from specific cases to general conclusion
- Strength: How well do the examples support the generalization?
- Sample size and representativeness
- Common inductive fallacies:
  * Hasty Generalization (insufficient sample size)
  * Biased Sample
  * False Analogy
  * Post Hoc Ergo Propter Hoc (confusing correlation with causation)
  * Cherry Picking (selective evidence)`;
    } else {
      specificInstructions = `This is an ABDUCTIVE argument (inference to best explanation). Analyze it for:
- The observation/phenomenon being explained
- The proposed explanation
- Plausibility: Is this really the BEST explanation?
- Alternative explanations considered
- Common abductive fallacies:
  * False Dilemma (ignoring other explanations)
  * Jumping to Conclusions
  * Affirming the Consequent (if treating it as deductive)
  * Conspiracy Thinking (preferring complex explanations over simple ones)`;
    }

    const userPrompt = `ARGUMENT TO ANALYZE:
"${text}"

REASONING TYPE: ${reasoningType}

${specificInstructions}

Provide comprehensive logical analysis. If you find NO fallacies, return an empty array for fallacies. Be thorough but fair - only identify actual logical errors, not mere disagreements with premises.`;

    return [
      { role: 'user', content: systemPrompt + '\n\n' + userPrompt }
    ];
  }
}
