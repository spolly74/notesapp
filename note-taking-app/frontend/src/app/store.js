import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from '../features/folders/foldersSlice';
import tagsReducer from '../features/tags/tagsSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    tags: tagsReducer,
    chat: chatReducer
  },
});

export default store;
