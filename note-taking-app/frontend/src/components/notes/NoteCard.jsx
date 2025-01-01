import React from 'react';
import { Clock, Folder } from 'lucide-react';

// filepath: frontend/src/components/notes/NoteCard.jsx
const NoteCard = ({ title, preview, updatedAt, folder, tags = [] }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <Clock className="h-3 w-3" />
        <span>Updated {updatedAt}</span>
        <span>•</span>
        <Folder className="h-3 w-3" />
        <span>{folder}</span>
      </div>
      {tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm mt-2 text-gray-600 line-clamp-2">{preview}</p>
    </div>
  );
};

export default NoteCard;
