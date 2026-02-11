import React, { useState, useRef, useEffect } from 'react';
import { Message, TripleBotResponse } from '../types/chat';
import { chatApi } from '../services/api';
import { ChatMessage } from '../components/ChatMessage';
import { TripleResponse } from '../components/TripleResponse';
import { Header } from '../components/Header';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatApi.getTripleReasoning(inputValue, messages);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'triple-bot',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      alert('Failed to get response. Please check your API configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const ReasoningTypeCard = ({
    icon,
    title,
    description,
    examples,
    color
  }: {
    icon: string;
    title: string;
    description: string;
    examples: string;
    color: string;
  }) => (
    <div className={`${color} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{description}</p>
      <p className="text-xs text-gray-600 italic">{examples}</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto">
              {/* Title */}
              <div className="text-center mb-8 pt-8">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  Triple-Reasoning Analyzer
                </h1>
                <p className="text-xl text-gray-600">
                  Ask any question and receive three AI responses, each using a distinct reasoning approach
                </p>
              </div>

              {/* Important Disclaimer */}
              <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Educational Simulation Notice</h3>
                    <p className="text-sm text-amber-800 leading-relaxed mb-2">
                      This tool demonstrates <strong>PSEUDO-reasoning types</strong>. Large Language Models (LLMs) are fundamentally
                      statistical pattern matchers and next-token predictors - they don't truly "reason" in the classical sense.
                    </p>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      We use <strong>carefully crafted prompts</strong> to force the LLM to simulate deductive, inductive, and abductive
                      reasoning patterns. This is an educational exercise to explore different argumentation styles, not genuine logical reasoning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reasoning Types */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  How it works
                </h2>
                <p className="text-sm text-gray-600 mb-6 italic">
                  (Simulated via prompt engineering)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <ReasoningTypeCard
                    icon="🎯"
                    title="Pseudo-Deductive Reasoning"
                    description="Applies general rules to reach specific, guaranteed conclusions. If premises are true, conclusion must be true."
                    examples='Example: "All humans are mortal → Socrates is human → Therefore, Socrates is mortal"'
                    color="bg-blue-50 border border-blue-100"
                  />
                  <ReasoningTypeCard
                    icon="🔍"
                    title="Pseudo-Inductive Reasoning"
                    description="Observes specific patterns to form general conclusions. Uses evidence to suggest probable (not certain) outcomes."
                    examples='Example: "The sun rose yesterday, the day before → Pattern suggests the sun will rise tomorrow"'
                    color="bg-pink-50 border border-pink-100"
                  />
                  <ReasoningTypeCard
                    icon="💡"
                    title="Pseudo-Abductive Reasoning"
                    description="Finds the best explanation for observations. Inference to the most likely cause or hypothesis."
                    examples='Example: "The grass is wet → Best explanation: it rained (vs. sprinkler, dew, etc.)"'
                    color="bg-green-50 border border-green-100"
                  />
                </div>

                {/* Detailed Reasoning Instructions */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-300 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">📋</span>
                    Response Structure Guidelines
                  </h3>

                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-900 mb-2">1. DEDUCTIVE RESPONSE (syllogistic structure, general to specific):</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Start with universal principles or established facts</li>
                        <li>Apply logical rules to the specific case</li>
                        <li>Draw necessary conclusions that MUST follow</li>
                        <li>Use clear logical connectors (if...then, all...are, therefore)</li>
                        <li>Keep to 2-4 sentences</li>
                        <li className="italic">Format example: "All X are Y. Z is X. Therefore, Z is Y."</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-pink-900 mb-2">2. INDUCTIVE RESPONSE (pattern recognition, specific to general):</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Reference specific historical examples or cases (at least 2-3)</li>
                        <li>Identify patterns or commonalities across examples</li>
                        <li>Generalize cautiously using probability language (likely, probably, suggests)</li>
                        <li>Acknowledge the conclusion is probable, not certain</li>
                        <li>Keep to 2-4 sentences</li>
                        <li className="italic">Format example: "X happened in cases A, B, and C. This pattern suggests X probably happens in similar case D."</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-green-900 mb-2">3. ABDUCTIVE RESPONSE (inference to best explanation, effect to cause):</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>State the observation or phenomenon clearly</li>
                        <li>Propose the most likely explanation for why it occurs</li>
                        <li>Briefly acknowledge that alternative explanations exist</li>
                        <li>Use explanatory language (best explains, most likely because, suggests)</li>
                        <li>Keep to 2-4 sentences</li>
                        <li className="italic">Format example: "We observe X. The best explanation for X is Y, because Y would account for all the key features we see."</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="text-xl mr-2">🔬</span>
                    Logic Analysis Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Symbolic Logic Notation:</strong> See your arguments in formal logic (P→Q, ∴, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Argument Structure:</strong> Premises, conclusions, and argument forms (Modus Ponens, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Validity Assessment:</strong> Determine if conclusions logically follow from premises</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Fallacy Detection:</strong> Identify logical fallacies like Ad Hominem, Straw Man, False Dilemma, Slippery Slope, and more</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Example Questions */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">💬</span>
                  Example Questions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setInputValue("Should we regulate artificial intelligence?")}
                    className="text-left text-sm bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-200 transition-colors"
                  >
                    "Should we regulate artificial intelligence?"
                  </button>
                  <button
                    onClick={() => setInputValue("Is consciousness unique to biological beings?")}
                    className="text-left text-sm bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-200 transition-colors"
                  >
                    "Is consciousness unique to biological beings?"
                  </button>
                  <button
                    onClick={() => setInputValue("What causes economic recessions?")}
                    className="text-left text-sm bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-200 transition-colors"
                  >
                    "What causes economic recessions?"
                  </button>
                  <button
                    onClick={() => setInputValue("Are humans naturally cooperative or competitive?")}
                    className="text-left text-sm bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg border border-gray-200 transition-colors"
                  >
                    "Are humans naturally cooperative or competitive?"
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.type === 'user' ? (
                    <ChatMessage
                      content={message.content as string}
                      timestamp={message.timestamp}
                    />
                  ) : (
                    <TripleResponse
                      response={message.content as TripleBotResponse}
                      timestamp={message.timestamp}
                    />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center py-8">
                  <div className="bg-gray-100 rounded-xl px-6 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Generating triple reasoning analysis...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any question to receive three reasoning-based responses..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              rows={1}
              style={{ minHeight: '56px', maxHeight: '200px' }}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2.5 rounded-full transition-colors disabled:cursor-not-allowed shadow-md"
              title="Send message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Press Enter to send • Shift+Enter for new line • Click "Analyze Logic" on any response for detailed logical analysis
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Created by Carlos Trevisan
          </p>
        </div>
      </footer>
    </div>
  );
};
