// src/tests/integration/Folders.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../setup/test-utils';
import userEvent from '@testing-library/user-event';
import { FolderList } from '../../features/folders/components/FolderList';

describe('Folders Integration', () => {
  test('loads and displays folders', async () => {
    render(<FolderList />);

    await waitFor(() => {
      expect(screen.getByText('Test Folder 1')).toBeInTheDocument();
      expect(screen.getByText('Test Folder 2')).toBeInTheDocument();
    });
  });

  test('creates new folder', async () => {
    render(<FolderList />);

    const createButton = screen.getByText('Create New Folder');
    userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Enter folder name');
    userEvent.type(input, 'New Test Folder');

    const submitButton = screen.getByText('Create Folder');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('New Test Folder')).toBeInTheDocument();
    });
  });
});
