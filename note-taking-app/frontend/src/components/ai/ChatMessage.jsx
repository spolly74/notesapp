import React from 'react';
import { Bot, User } from 'lucide-react';

// filepath: frontend/src/components/ai/ChatMessage.jsx
const ChatMessage = ({ message, type }) => {
  const isAI = type === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? 'bg-gray-50' : ''} p-3`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center
        ${isAI ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
      >
        {isAI ? <Bot size={14} /> : <User size={14} />}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-900">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
