import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, selectIsTyping } from '../chatSlice';
import { Button } from '../../../components/common/Button';

const ChatInput = ({ chatId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);
  const isTyping = useSelector(selectIsTyping);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      dispatch(sendMessage({
        chatId,
        message: message.trim()
      }));
      setMessage('');
      setRows(1);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage(value);

    // Adjust textarea height
    const textArea = textareaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = Math.min(textArea.scrollHeight, 150) + 'px';
      setRows(Math.min(Math.floor(textArea.scrollHeight / 24), 6));
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [chatId]);

  return (
    <div className="border-t bg-white px-4 py-3">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="Type your message... (Press Enter to send, Shift + Enter for new line)"
            className={`
              w-full px-4 py-2 border rounded-lg resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isTyping ? 'bg-gray-50' : 'bg-white'}
            `}
            disabled={isTyping}
          />
          {isTyping && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="text-sm text-gray-500">AI is typing...</div>
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || isTyping}
          className="self-end"
        >
          Send
        </Button>
      </form>
      <div className="mt-1 text-xs text-gray-500 px-2">
        {isTyping ? 'Please wait for AI to respond' : 'Press Enter to send, Shift + Enter for new line'}
      </div>
    </div>
  );
};

export default ChatInput;
