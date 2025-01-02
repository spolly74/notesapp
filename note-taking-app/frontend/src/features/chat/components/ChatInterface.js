import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChatHistory,
  startChat,
  sendMessage,
  endChat,
  selectCurrentChat,
  selectChatHistory,
  selectChatStatus,
  selectChatError,
  selectIsTyping
} from '../chatSlice';

// Common components
import { Button } from '../../../components/common/Button';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../../components/common/ErrorAlert';

const ChatInterface = () => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');

  // Redux selectors
  const currentChat = useSelector(selectCurrentChat);
  const chatHistory = useSelector(selectChatHistory);
  const status = useSelector(selectChatStatus);
  const error = useSelector(selectChatError);
  const isTyping = useSelector(selectIsTyping);

  // Fetch chat history on component mount
  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  // Handlers
  const handleStartNewChat = () => {
    dispatch(startChat('Hello, I would like to start a new conversation.'));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && currentChat) {
      dispatch(sendMessage({
        chatId: currentChat._id,
        message: inputMessage.trim()
      }));
      setInputMessage('');
    }
  };

  const handleEndChat = () => {
    if (currentChat) {
      dispatch(endChat(currentChat._id));
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorAlert message={error} />
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Chat History Sidebar */}
      <div className="w-80 border-r bg-gray-50 flex flex-col">
        {/* New Chat Button */}
        <div className="p-4 border-b">
          <Button
            onClick={handleStartNewChat}
            className="w-full justify-center"
          >
            New Chat
          </Button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto">
          {chatHistory.map((chat) => (
            <div
              key={chat._id}
              onClick={() => dispatch(setCurrentChat(chat))}
              className={`
                p-4 cursor-pointer hover:bg-gray-100
                ${currentChat?._id === chat._id ? 'bg-gray-100' : ''}
              `}
            >
              <div className="font-medium truncate">
                {chat.title || 'New Conversation'}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {new Date(chat.updatedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {currentChat.title || 'New Chat'}
              </h2>
              <Button
                variant="secondary"
                onClick={handleEndChat}
              >
                End Chat
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              {currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 ${message.isUser ? 'text-right' : ''}`}
                >
                  <div
                    className={`
                      inline-block max-w-[70%] p-4 rounded-lg
                      ${message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                      }
                    `}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="p-4">
                  <div className="inline-block bg-gray-100 p-4 rounded-lg">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                >
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          // Welcome Screen
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Welcome to the Chat Interface
              </h2>
              <p className="text-gray-600 mb-6">
                Start a new chat or select an existing conversation from the sidebar.
              </p>
              <Button onClick={handleStartNewChat}>
                Start New Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
