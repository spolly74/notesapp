import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Async Thunks
export const fetchFolders = createAsyncThunk(
  'folders/fetchFolders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/folders`, {
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

export const createFolder = createAsyncThunk(
  'folders/createFolder',
  async (folderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/folders`, folderData, {
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

export const updateFolder = createAsyncThunk(
  'folders/updateFolder',
  async ({ id, ...folderData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/folders/${id}`, folderData, {
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

export const deleteFolder = createAsyncThunk(
  'folders/deleteFolder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/folders/${id}`, {
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

export const reorderFolders = createAsyncThunk(
  'folders/reorderFolders',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/folders/reorder`,
        { folders: newOrder },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentFolder: null,
    draggedFolder: null
  },
  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    setDraggedFolder: (state, action) => {
      state.draggedFolder = action.payload;
    },
    // Optimistic update for reordering
    reorderFoldersOptimistic: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch folders
      .addCase(fetchFolders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch folders';
      })

      // Create folder
      .addCase(createFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create folder';
      })

      // Update folder
      .addCase(updateFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFolder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(folder => folder._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateFolder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update folder';
      })

      // Delete folder
      .addCase(deleteFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(folder => folder._id !== action.payload);
        if (state.currentFolder?._id === action.payload) {
          state.currentFolder = null;
        }
        state.error = null;
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to delete folder';
      })

      // Reorder folders
      .addCase(reorderFolders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reorderFolders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(reorderFolders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to reorder folders';
      });
  }
});

// Actions
export const {
  setCurrentFolder,
  setDraggedFolder,
  reorderFoldersOptimistic
} = foldersSlice.actions;

// Selectors
export const selectAllFolders = (state) => state.folders.items;
export const selectFolderStatus = (state) => state.folders.status;
export const selectFolderError = (state) => state.folders.error;
export const selectCurrentFolder = (state) => state.folders.currentFolder;
export const selectDraggedFolder = (state) => state.folders.draggedFolder;

export default foldersSlice.reducer;
