// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ChatTab from './ChatTab.js';
import { chatMessages } from '../data/mockData.js';

describe('ChatTab', () => {
  it('renders every seeded chat message', () => {
    render(<ChatTab />);
    for (const m of chatMessages) {
      expect(screen.getByText(m.text)).toBeInTheDocument();
    }
  });

  it('has a message input and send button', () => {
    render(<ChatTab />);
    expect(screen.getByPlaceholderText('Pergunte algo sobre suas ações...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });
});
