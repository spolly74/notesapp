import React, { useState } from 'react';
import { Send } from 'lucide-react';

// filepath: frontend/src/components/ai/ChatInput.jsx
const ChatInput = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question..."
        className="flex-1 px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`p-2 rounded-full ${
          message.trim() && !isLoading
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default ChatInput;
