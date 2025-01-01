import React from 'react';
import { ChevronDown } from 'lucide-react';
import NoteCard from './NoteCard';

// filepath: frontend/src/components/notes/NoteList.jsx
const NoteList = ({ notes = [], onNoteSelect }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Notes</h2>
        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100">
          <span>Sort</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No notes found</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} onClick={() => onNoteSelect(note.id)}>
              <NoteCard
                title={note.title}
                preview={note.preview}
                updatedAt={note.updatedAt}
                folder={note.folder}
                tags={note.tags}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
