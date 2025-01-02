// src/features/folders/components/CreateFolderForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFolder } from '../foldersSlice';
import { Button } from '../../../components/common/Button';

export const CreateFolderForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createFolder({
        name: name.trim(),
        path: `/${name.toLowerCase().replace(/\s+/g, '-')}`
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
        Create New Folder
      </Button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="folderName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Folder Name
          </label>
          <input
            id="folderName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter folder name"
            autoFocus
          />
        </div>

        <div className="flex space-x-2">
          <Button
            type="submit"
            disabled={!name.trim()}
            className="flex-1"
          >
            Create Folder
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
              setName('');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
