// src/features/tags/components/CreateTagForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTag } from '../tagsSlice';
import { Button } from '../../../components/common/Button';

export const CreateTagForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6'); // Default blue color

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createTag({
        name: name.trim(),
        color
      }));
      setName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        Create New Tag
      </Button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter tag name"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              {color.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            type="submit"
            disabled={!name.trim()}
            className="flex-1"
          >
            Create Tag
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
