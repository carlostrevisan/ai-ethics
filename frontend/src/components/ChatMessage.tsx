import React from 'react';

interface ChatMessageProps {
  content: string;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, timestamp }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-2xl">
        <div className="bg-green-100 text-green-900 rounded-lg px-4 py-3 shadow-sm">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
