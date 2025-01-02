// src/features/folders/components/FolderItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFolder, updateFolder } from '../foldersSlice';
import { Button } from '../../../components/common/Button';

export const FolderItem = ({ folder }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(folder.name);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdate = () => {
    if (name.trim()) {
      dispatch(updateFolder({
        id: folder._id,
        name: name.trim(),
        path: `/${name.toLowerCase().replace(/\s+/g, '-')}`
      }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      dispatch(deleteFolder(folder._id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-3 mb-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Folder name"
            autoFocus
          />
          <Button
            onClick={handleUpdate}
            disabled={!name.trim()}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsEditing(false);
              setName(folder.name);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-lg hover:shadow transition-shadow duration-200 mb-2">
      <div className="flex items-center p-3">
        {/* Folder Icon and Name */}
        <div
          className="flex-1 flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'transform rotate-90' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="font-medium">{folder.name}</span>

          {/* Note Count Badge */}
          {folder.notes && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {folder.notes.length} note{folder.notes.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Edit folder"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1"
            title="Delete folder"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && folder.notes && (
        <div className="border-t px-3 py-2 bg-gray-50">
          {folder.notes.length > 0 ? (
            <ul className="space-y-1">
              {folder.notes.map(note => (
                <li key={note._id} className="text-sm text-gray-600 truncate">
                  {note.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No notes in this folder</p>
          )}
        </div>
      )}
    </div>
  );
};
