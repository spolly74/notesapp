import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChat, setCurrentChat, deleteChat } from '../chatSlice';

const ChatHistoryItem = ({ chat }) => {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const isActive = currentChat?._id === chat._id;

  // Get preview of the first message
  const getPreviewText = () => {
    if (!chat.messages || chat.messages.length === 0) return 'No messages';
    const firstMessage = chat.messages[0].content;
    return firstMessage.length > 60
      ? `${firstMessage.substring(0, 60)}...`
      : firstMessage;
  };

  // Format the date
  const formatDate = (date) => {
    const chatDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (chatDate.toDateString() === today.toDateString()) {
      return chatDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (chatDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return chatDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const handleClick = () => {
    dispatch(setCurrentChat(chat));
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent chat selection when deleting
    if (window.confirm('Are you sure you want to delete this chat?')) {
      dispatch(deleteChat(chat._id));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative px-4 py-3 cursor-pointer transition-colors duration-150
        hover:bg-gray-100 border-b
        ${isActive ? 'bg-blue-50 hover:bg-blue-100' : ''}
      `}
    >
      {/* Chat Header */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1">
          <h3 className="font-medium text-sm truncate pr-8">
            {chat.title || 'New Chat'}
          </h3>
          <span className="text-xs text-gray-500">
            {formatDate(chat.updatedAt)}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`
            absolute right-4 top-3 p-1 rounded-full
            text-gray-400 hover:text-red-500 hover:bg-red-50
            transition-colors duration-150
            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
          title="Delete chat"
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

      {/* Preview Text */}
      <p className="text-sm text-gray-500 truncate">
        {getPreviewText()}
      </p>

      {/* Message Count Badge */}
      <div className="mt-1 flex items-center space-x-2">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
        </span>
        {chat.isActive && (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
            Active
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryItem;
