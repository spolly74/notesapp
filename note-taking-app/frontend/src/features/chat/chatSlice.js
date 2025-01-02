import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Async thunks
export const startChat = createAsyncThunk(
  'chat/startChat',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, { message }, {
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

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/chat/${chatId}/message`,
        { message },
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

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/chat/history`, {
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

export const endChat = createAsyncThunk(
  'chat/endChat',
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/chat/${chatId}/end`, {}, {
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

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChat: null,
    chatHistory: [],
    status: 'idle',
    error: null,
    isTyping: false
  },
  reducers: {
    setTypingStatus: (state, action) => {
      state.isTyping = action.payload;
    },
    clearCurrentChat: (state) => {
      state.currentChat = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Start chat
      .addCase(startChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentChat = action.payload;
        state.error = null;
      })
      .addCase(startChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to start chat';
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.isTyping = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.currentChat = action.payload;
        state.isTyping = false;
        state.error = null;
      })
      // Fetch history
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.chatHistory = action.payload;
        state.error = null;
      })
      // End chat
      .addCase(endChat.fulfilled, (state, action) => {
        state.currentChat = action.payload;
        const index = state.chatHistory.findIndex(
          chat => chat._id === action.payload._id
        );
        if (index !== -1) {
          state.chatHistory[index] = action.payload;
        } else {
          state.chatHistory.push(action.payload);
        }
        state.error = null;
      });
  }
});

export const { setTypingStatus, clearCurrentChat } = chatSlice.actions;

// Selectors
export const selectCurrentChat = (state) => state.chat.currentChat;
export const selectChatHistory = (state) => state.chat.chatHistory;
export const selectChatStatus = (state) => state.chat.status;
export const selectChatError = (state) => state.chat.error;
export const selectIsTyping = (state) => state.chat.isTyping;

export default chatSlice.reducer;
