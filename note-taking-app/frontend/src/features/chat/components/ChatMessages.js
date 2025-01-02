// src/features/chat/components/ChatInterface.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChatHistory,
  selectCurrentChat,
  selectChatHistory,
  selectChatStatus,
  selectChatError,
  startChat
} from '../chatSlice';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../../components/common/ErrorAlert';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatHistory } from './ChatHistory';
import { Button } from '../../../components/common/Button';

export const ChatInterface = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const chatHistory = useSelector(selectChatHistory);
  const status = useSelector(selectChatStatus);
  const error = useSelector(selectChatError);

  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  const handleStartNewChat = () => {
    dispatch(startChat('Hello! I would like to start a new chat.'));
  };

  if (status === 'loading') {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
        <div className="p-4 border-b">
          <Button onClick={handleStartNewChat} className="w-full">
            New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatHistory chats={chatHistory} />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                {currentChat.title || 'New Chat'}
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              <ChatMessages messages={currentChat.messages} />
              <ChatInput chatId={currentChat._id} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Welcome to Chat</h3>
              <p className="mb-4">Select a chat from history or start a new one</p>
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
