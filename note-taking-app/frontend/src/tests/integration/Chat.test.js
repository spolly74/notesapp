// src/tests/integration/Chat.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../features/chat/chatSlice';

// Create a test component
const TestComponent = () => <div>Test Chat Component</div>;

// Create a test store
const store = configureStore({
  reducer: {
    chat: chatReducer
  }
});

describe('Chat Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByText('Test Chat Component')).toBeInTheDocument();
  });
});
