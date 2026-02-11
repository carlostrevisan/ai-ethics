import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <a
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors hover:text-blue-600"
          >
            <span className="text-xl font-bold text-gray-900">AI Ethics: AI Triple-Reasoning</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
