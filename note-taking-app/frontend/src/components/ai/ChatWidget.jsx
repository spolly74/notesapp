import React from 'react';
import { useChat } from '../../context/ChatContext';
import { MessageSquare } from 'lucide-react';

// filepath: frontend/src/components/ai/ChatWidget.jsx
const ChatWidget = () => {
  const { messages, addMessage, isLoading } = useChat();

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">Recent Chat</h3>
      </div>

      <div className="text-sm text-gray-600">
        {lastMessage ? (
          <p>{lastMessage.message}</p>
        ) : (
          <p>No messages yet</p>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-400">
        {isLoading ? 'AI is typing...' : ''}
      </div>
    </div>
  );
};

export default ChatWidget;
