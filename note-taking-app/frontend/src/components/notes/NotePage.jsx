import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

// filepath: frontend/src/components/notes/NotePage.jsx
const NotePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes] = useState([
    {
      id: 1,
      title: 'Product Meeting Notes',
      preview: 'Discussed new feature requirements...',
      content: 'Discussed new feature requirements...',
      updatedAt: '2h ago',
      folder: 'Meetings',
      tags: ['product', 'meeting']
    },
    {
      id: 2,
      title: 'Documentation Plan',
      preview: 'Outline for new documentation...',
      content: 'Outline for new documentation...',
      updatedAt: '5h ago',
      folder: 'Work',
      tags: ['docs']
    }
  ]);

  const handleNoteSelect = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleSave = (note) => {
    // TODO: Implement save functionality
    console.log('Saving note:', note);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col">
      {isEditing ? (
        <NoteEditor
          initialNote={selectedNote}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <>
          <NoteList
            notes={notes}
            onNoteSelect={handleNoteSelect}
          />
          <button
            onClick={handleNewNote}
            className="fixed right-6 bottom-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            <Plus className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default NotePage;
