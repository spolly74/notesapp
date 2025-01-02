/ src/tests/mocks/handlers.js
import { rest } from 'msw';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Folders endpoints
  rest.get(`${API_URL}/folders`, (req, res, ctx) => {
    return res(
      ctx.json([
        { _id: '1', name: 'Test Folder 1', path: '/test-1' },
        { _id: '2', name: 'Test Folder 2', path: '/test-2' }
      ])
    );
  }),

  // Tags endpoints
  rest.get(`${API_URL}/tags`, (req, res, ctx) => {
    return res(
      ctx.json([
        { _id: '1', name: 'Important', color: '#FF0000' },
        { _id: '2', name: 'Work', color: '#00FF00' }
      ])
    );
  }),

  // Chat endpoints
  rest.get(`${API_URL}/chat/history`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '1',
          messages: [{ content: 'Test message', isUser: true }]
        }
      ])
    );
  })
];
