import React, { useState } from 'react';
import { TripleBotResponse, BotResponse, ReasoningType, LogicAnalysis } from '../types/chat';
import { chatApi } from '../services/api';
import { LogicAnalysisModal } from './LogicAnalysisModal';

interface TripleResponseProps {
  response: TripleBotResponse;
  timestamp: Date;
}

interface ResponseCardProps {
  title: string;
  subtitle: string;
  response: BotResponse;
  reasoningType: ReasoningType;
  color: {
    light: string;
    border: string;
    text: string;
    button: string;
    buttonHover: string;
  };
}

const ResponseCard: React.FC<ResponseCardProps> = ({
  title,
  subtitle,
  response,
  reasoningType,
  color,
}) => {
  const [analysis, setAnalysis] = useState<LogicAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await chatApi.analyzeLogic(response.text, reasoningType);
      setAnalysis(result);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to analyze logic:', error);
      alert('Failed to analyze logic. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className={`${color.light} border ${color.border} rounded-lg p-4 shadow-sm flex flex-col h-full`}>
        <div className="mb-3">
          <h3 className={`font-bold text-lg ${color.text}`}>{title}</h3>
          <p className="text-xs text-gray-600 italic">{subtitle}</p>
        </div>

        <div className="flex-grow mb-3">
          <p className="text-sm text-gray-800 leading-relaxed">{response.text}</p>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`${color.button} ${color.buttonHover} text-white text-xs font-medium px-3 py-2 rounded transition-colors disabled:opacity-50`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Logic'}
          </button>
        </div>
      </div>

      <LogicAnalysisModal
        analysis={analysis}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        responseText={response.text}
      />
    </>
  );
};

export const TripleResponse: React.FC<TripleResponseProps> = ({ response, timestamp }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResponseCard
          title="Pseudo-Deductive"
          subtitle="General → Specific (Simulated)"
          response={response.deductive}
          reasoningType="deductive"
          color={{
            light: 'bg-deductive-light',
            border: 'border-deductive',
            text: 'text-deductive-dark',
            button: 'bg-deductive',
            buttonHover: 'hover:bg-deductive-dark',
          }}
        />
        <ResponseCard
          title="Pseudo-Inductive"
          subtitle="Specific → General (Simulated)"
          response={response.inductive}
          reasoningType="inductive"
          color={{
            light: 'bg-inductive-light',
            border: 'border-inductive',
            text: 'text-inductive-dark',
            button: 'bg-inductive',
            buttonHover: 'hover:bg-inductive-dark',
          }}
        />
        <ResponseCard
          title="Pseudo-Abductive"
          subtitle="Best Explanation (Simulated)"
          response={response.abductive}
          reasoningType="abductive"
          color={{
            light: 'bg-abductive-light',
            border: 'border-abductive',
            text: 'text-abductive-dark',
            button: 'bg-abductive',
            buttonHover: 'hover:bg-abductive-dark',
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};
