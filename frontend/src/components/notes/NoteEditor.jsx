import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import { useNotes } from '../../hooks/useNotes';

const NoteEditor = ({ noteId, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { getNote, saveNote } = useNotes();

  useEffect(() => {
    if (noteId) {
      getNote(noteId).then(note => {
        setTitle(note.title);
        setContent(note.content);
      });
    }
  }, [noteId]);

  const handleSave = async () => {
    const savedNote = await saveNote({
      id: noteId,
      title,
      content
    });
    if (onSave) {
      onSave(savedNote);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ alignSelf: 'flex-end' }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default NoteEditor;
