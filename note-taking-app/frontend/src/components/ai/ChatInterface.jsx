import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../../context/ChatContext';

// filepath: frontend/src/components/ai/ChatInterface.jsx
const ChatInterface = () => {
  const {
    messages,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError
  } = useChat();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    // Add user message
    addMessage(message, 'user');
    setLoading(true);

    try {
      // TODO: Implement actual AI API call here
      // Simulated AI response for now
      setTimeout(() => {
        addMessage(`I received your message: "${message}". This is a placeholder response.`, 'ai');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-sm">AI Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              type={message.type}
            />
          ))}
          {isLoading && (
            <div className="p-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
