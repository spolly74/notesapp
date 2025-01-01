import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNote = useCallback(async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const saveNote = useCallback(async (note) => {
    try {
      const response = note.id
        ? await api.put(`/notes/${note.id}`, note)
        : await api.post('/notes', note);

      setNotes(prev => {
        const index = prev.findIndex(n => n.id === note.id);
        if (index >= 0) {
          return [...prev.slice(0, index), response.data, ...prev.slice(index + 1)];
        }
        return [...prev, response.data];
      });

      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    getNote,
    saveNote
  };
};
