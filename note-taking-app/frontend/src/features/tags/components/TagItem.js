// src/features/tags/components/TagItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTag, updateTag } from '../tagsSlice';
import { Button } from '../../../components/common/Button';

export const TagItem = ({ tag }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);

  const handleUpdate = () => {
    if (name.trim()) {
      dispatch(updateTag({
        id: tag._id,
        name: name.trim(),
        color
      }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      dispatch(deleteTag(tag._id));
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Tag name"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <Button
          onClick={handleUpdate}
          disabled={!name.trim()}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div
      className="group flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-200"
      style={{
        backgroundColor: `${tag.color}20`,
        borderWidth: '1px',
        borderColor: tag.color
      }}
    >
      <span
        className="text-sm font-medium"
        style={{ color: tag.color }}
      >
        {tag.name}
      </span>
      <div className="hidden group-hover:flex items-center space-x-1">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-gray-600 p-1"
          title="Edit tag"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 p-1"
          title="Delete tag"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
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
  );
};
