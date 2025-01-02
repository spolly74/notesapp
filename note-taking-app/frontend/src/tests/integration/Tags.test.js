// src/tests/integration/Tags.test.js
import React from 'react';
import { render, screen, waitFor } from '../setup/test-utils';
import userEvent from '@testing-library/user-event';
import { TagList } from '../../features/tags/components/TagList';

describe('Tags Integration', () => {
  test('loads and displays tags', async () => {
    render(<TagList />);

    await waitFor(() => {
      expect(screen.getByText('Important')).toBeInTheDocument();
      expect(screen.getByText('Work')).toBeInTheDocument();
    });
  });

  test('creates new tag', async () => {
    render(<TagList />);

    const createButton = screen.getByText('Create New Tag');
    userEvent.click(createButton);

    const input = screen.getByLabelText('Tag Name');
    userEvent.type(input, 'Personal');

    const submitButton = screen.getByText('Create Tag');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Personal')).toBeInTheDocument();
    });
  });
});
