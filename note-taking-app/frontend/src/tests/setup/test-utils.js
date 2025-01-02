// src/tests/setup/test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../features/chat/chatSlice';
import foldersReducer from '../../features/folders/foldersSlice';
import tagsReducer from '../../features/tags/tagsSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        chat: chatReducer,
        folders: foldersReducer,
        tags: tagsReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
