import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Async thunks
export const fetchTags = createAsyncThunk(
  'tags/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tags`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (tagData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/tags`, tagData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async ({ id, ...tagData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/tags/${id}`, tagData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedTags: []
  },
  reducers: {
    toggleTagSelection: (state, action) => {
      const tagId = action.payload;
      const index = state.selectedTags.indexOf(tagId);
      if (index === -1) {
        state.selectedTags.push(tagId);
      } else {
        state.selectedTags.splice(index, 1);
      }
    },
    clearSelectedTags: (state) => {
      state.selectedTags = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch tags';
      })
      // Create tag
      .addCase(createTag.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      // Update tag
      .addCase(updateTag.fulfilled, (state, action) => {
        const index = state.items.findIndex(tag => tag._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      // Delete tag
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.items = state.items.filter(tag => tag._id !== action.payload);
        state.selectedTags = state.selectedTags.filter(id => id !== action.payload);
        state.error = null;
      });
  }
});

export const { toggleTagSelection, clearSelectedTags } = tagsSlice.actions;

// Selectors
export const selectAllTags = (state) => state.tags.items;
export const selectTagStatus = (state) => state.tags.status;
export const selectTagError = (state) => state.tags.error;
export const selectSelectedTags = (state) => state.tags.selectedTags;

export default tagsSlice.reducer;
