import React from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ChatInterface from '../ai/ChatInterface';

// filepath: frontend/src/components/layout/ActionBar.jsx
const ActionBar = () => {
  const { messages, isLoading } = useChat();

  return (
    <aside className="w-64 bg-gray-50 border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-sm">Action Items</h2>
          <button className="flex items-center space-x-1 text-xs px-2 py-1 hover:bg-gray-200 rounded">
            <span>All</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="p-3 bg-white rounded border border-gray-200">
            <h3 className="text-sm font-medium">Update API docs</h3>
            <p className="text-xs text-gray-500 mt-1">Due Tomorrow • M</p>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200">
            <h3 className="text-sm font-medium">Review feedback</h3>
            <p className="text-xs text-gray-500 mt-1">Due Friday • S</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <ChatInterface />
        {isLoading && (
          <div className="px-4 py-2 text-xs text-gray-500">
            AI is thinking...
          </div>
        )}
      </div>
    </aside>
  );
};

export default ActionBar;
