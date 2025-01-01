import React from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';

// filepath: frontend/src/components/layout/ActionBar.jsx
const ActionBar = () => {
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
        <div className="p-4">
          <h2 className="font-semibold text-sm mb-3">AI Chat</h2>
          <div className="flex-1 bg-white border border-gray-200 rounded h-64 mb-4">
            {/* Chat messages will go here */}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MessageSquare className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ActionBar;
