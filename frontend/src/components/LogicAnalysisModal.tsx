import React from 'react';
import { LogicAnalysis } from '../types/chat';

interface LogicAnalysisModalProps {
  analysis: LogicAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
  responseText?: string;
}

export const LogicAnalysisModal: React.FC<LogicAnalysisModalProps> = ({
  analysis,
  isOpen,
  onClose,
  responseText,
}) => {
  if (!isOpen || !analysis) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Logic Analysis</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Original Response */}
          {responseText && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Original Response</h3>
              <div className="bg-blue-50 border border-blue-200 rounded px-4 py-3">
                <p className="text-sm text-gray-800 leading-relaxed">{responseText}</p>
              </div>
            </div>
          )}

          {/* Symbolic Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Symbolic Form</h3>
            <div className="bg-gray-100 rounded px-4 py-3 font-mono text-sm">
              {analysis.symbolicForm}
            </div>
          </div>

          {/* Argument Structure */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Argument Structure</h3>
            <div className="bg-blue-50 rounded px-4 py-3 space-y-2">
              <div>
                <p className="font-semibold text-sm text-blue-900 mb-1">Premises:</p>
                <ol className="list-decimal list-inside space-y-1">
                  {analysis.premises.map((premise, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {premise}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="font-semibold text-sm text-blue-900 mb-1">Conclusion:</p>
                <p className="text-sm text-gray-700">{analysis.conclusion}</p>
              </div>
            </div>
          </div>

          {/* Argument Form & Validity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Argument Form</h3>
              <div className="bg-purple-50 rounded px-4 py-3">
                <p className="text-sm font-medium text-purple-900">{analysis.argumentForm}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Validity</h3>
              <div className={`rounded px-4 py-3 ${analysis.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`text-sm font-medium ${analysis.isValid ? 'text-green-900' : 'text-red-900'}`}>
                  {analysis.isValid ? '✓ Valid' : '✗ Invalid'}
                </p>
              </div>
            </div>
          </div>

          {/* Fallacies */}
          {analysis.fallacies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Fallacies Detected ({analysis.fallacies.length})
              </h3>
              <div className="space-y-4">
                {analysis.fallacies.map((fallacy, idx) => (
                  <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-red-900">{fallacy.name}</h4>
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                        {fallacy.type}
                      </span>
                    </div>
                    {fallacy.symbolicForm && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-red-800">Symbolic Form:</p>
                        <p className="text-sm font-mono text-red-700">{fallacy.symbolicForm}</p>
                      </div>
                    )}
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-red-800">Location:</p>
                      <p className="text-sm text-red-700">{fallacy.location}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-red-800">Explanation:</p>
                      <p className="text-sm text-red-700">{fallacy.explanation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-800">Correction:</p>
                      <p className="text-sm text-green-700">{fallacy.correction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Overall Explanation</h3>
            <div className="bg-gray-50 rounded px-4 py-3">
              <p className="text-sm text-gray-700 leading-relaxed">{analysis.explanation}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
