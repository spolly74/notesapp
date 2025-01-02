import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentChat,
  setCurrentChat,
  deleteChat
} from '../chatSlice';
import { Button } from '../../../components/common/Button';

const ChatHistory = ({ chats }) => {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);

  // Get first few words of the first message for preview
  const getPreviewText = (messages) => {
    if (!messages.length) return 'No messages';
    const firstMessage = messages[0].content;
    return firstMessage.length > 60
      ? firstMessage.substring(0, 60) + '...'
      : firstMessage;
  };

  // Format date to be more readable
  const formatDate = (date) => {
    const chatDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (chatDate.toDateString() === today.toDateString()) {
      return `Today at ${chatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (chatDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${chatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return chatDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Handle chat selection
  const handleChatSelect = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  // Handle chat deletion
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation(); // Prevent chat selection when deleting
    if (window.confirm('Are you sure you want to delete this chat?')) {
      dispatch(deleteChat(chatId));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            No chat history yet
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatSelect(chat)}
              className={`
                p-4 border-b cursor-pointer transition-colors duration-150
                hover:bg-gray-100
                ${currentChat?._id === chat._id ? 'bg-blue-50' : ''}
              `}
            >
              {/* Chat Item Header */}
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium truncate">
                  {chat.title || 'New Chat'}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(chat.updatedAt)}
                  </span>
                  <button
                    onClick={(e) => handleDeleteChat(e, chat._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Preview Text */}
              <p className="text-sm text-gray-500 truncate">
                {getPreviewText(chat.messages)}
              </p>

              {/* Message Count */}
              <div className="mt-1">
                <span className="text-xs text-gray-400">
                  {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear History Button */}
      {chats.length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="secondary"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all chat history?')) {
                // Implement clear all functionality
                dispatch(clearAllChats());
              }
            }}
            className="w-full text-sm"
          >
            Clear All History
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
